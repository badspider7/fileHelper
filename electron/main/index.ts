import { app, BrowserWindow, shell, ipcMain, dialog, Menu } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { setupHandle } from '../handle';
import child_process from "child_process";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { initDB } from '../db';


process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const VUEJS3_DEVTOOLS = "nhdogjmejiglipccpnnnanhbledajbpd";

export const isWin11 = child_process
  .execSync("wmic os get Caption /value")
  .toString()
  .trim()
  .includes("Microsoft Windows 11");


ipcMain.on('checkIsWin11', (event, args) => {
  event.returnValue = isWin11;
})

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}




let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: '首页',
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: true,
    },
    titleBarStyle: 'hidden',
    show: false,
  })

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    win.webContents.openDevTools()
  } else {
    Menu.setApplicationMenu(null);
    win.loadFile(indexHtml)
  }

  //在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 ready-to-show 事件 。 在此事件后显示窗口将没有视觉闪烁：
  win.once("ready-to-show", () => {
    win.show();
    //限制窗口的最小化尺寸
    win.setMinimumSize(800, 600)
  });
  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    initDB();
    // win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(() => {
  createWindow()
  setupHandle(win)
  if (process.env.VITE_DEV_SERVER_URL) {
    installExtension(VUEJS3_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }
}
)

app.on('window-all-closed', () => {
  console.log('application is closing now!')
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    console.log('open second window')
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus();
    win.show();
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

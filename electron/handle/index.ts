import { setupTray } from './handleTray'
import { setupTitleBarHandler, isMaximized } from './handleTitleBar'
import { handleFileopen, setupHandleFile, openFileWithVSCode } from './handleFileSystem'
import { app, ipcMain, BrowserWindow } from "electron";


export function setupHandle(win: BrowserWindow) {
    setupTray();
    setupTitleBarHandler(win);
    isMaximized(win);
    setupHandleFile();
    openFileWithVSCode();
    ipcMain.on('set-title', (event, title) => {
        const webContent = event.sender
        const win = BrowserWindow.fromWebContents(webContent);
        win.setTitle(title);
    })

    ipcMain.handle('fileSystem:openFile', (event, type) => {
        return handleFileopen(event, type)
    })
}
import { setupTray } from './handleTray'
import { setupTitleBarHandler, isMaximized } from './handleTitleBar'
import { handleFileopen, setupHandleFile, openFileWithVSCode, openFileWithFolder } from './handleFileSystem'
import { app, ipcMain, BrowserWindow } from "electron";
import { searchInExplorer } from '../utils/util'


export function setupHandle(win: BrowserWindow) {
    setupTray();
    setupTitleBarHandler(win);
    isMaximized(win);
    setupHandleFile();
    openFileWithVSCode();
    openFileWithFolder();
    ipcMain.on('set-title', (event, title) => {
        const webContent = event.sender
        const win = BrowserWindow.fromWebContents(webContent);
        win.setTitle(title);
    })

    ipcMain.handle('fileSystem:openFile', (event, type) => {
        return handleFileopen(event, type)
    })

    ipcMain.handle('utils:searchInExplorer', (event, data) => {
        return searchInExplorer(data)
    })
}
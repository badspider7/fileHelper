import { app, ipcMain, BrowserWindow } from "electron";


export function setupTitleBarHandler(win: BrowserWindow) {
    ipcMain.handle("titleBarControl:minimize", (event, args) => {
        win.minimize();
    });
    ipcMain.handle("titleBarControl:maximizeOrUnmaximize", () => {
        if (!win.isMaximized()) {
            win.maximize();
            return true;
        } else {
            win.unmaximize();
            return false
        }
    });
    ipcMain.handle("titleBarControl:close", (event, type: string) => {
        if (type === "hide") {
            win.hide();
        } else {
            app.quit();
        }
    });

}

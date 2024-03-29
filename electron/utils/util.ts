import { app, BrowserWindow } from 'electron'
import sudo from 'sudo-prompt'
import everythingNode from "everything-node";



export function showMainWindow(route?: string | { name: string }) {
    // 获取当前的窗口  目前程序只做一个窗口
    const windows = BrowserWindow.getAllWindows();
    if (windows.length) {
        const win = windows.at(0);
        if (route) {
            console.log('jump', route)
            win.webContents.send("jumpRoute", route);
        }
        //win.restore();
        win.show();
    }
}

export function sendToWebContent(channel: string, data?: any) {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length) {
        const win = windows.at(0);
        win?.webContents.send(channel, data);
    }
}

export function getPath(unpackPath: boolean = false) {
    if (!app.isPackaged) {
        return __dirname;
    }
    return unpackPath ? __dirname.replace("app.asar", "app.asar.unpacked") : __dirname;
}



export async function searchInExplorer(searchText: string): Promise<object[]> {
    const _everything = new everythingNode();
    _everything.limit(10);
    _everything.addSearchText(searchText);
    const data = await _everything.run();
    return data;
}

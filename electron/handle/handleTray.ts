import { app, Tray, Menu } from "electron";
import path from 'node:path'
import { showMainWindow } from "../utils/util";

export function setupTray(): void {
    let tray = new Tray(path.join(process.env.VITE_PUBLIC, 'icon.ico'));

    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示',
            click: () => {
                showMainWindow({ name: 'index' })
            }
        },
        {
            label: "设置",
            click: () => {

                showMainWindow({ name: 'setting' })
            }
        },
        {
            label: '退出', click: () => {
                console.log('application is closing now!')
                app.exit()
            }
        }
    ])
    tray.setToolTip('文件助手')
    tray.setContextMenu(contextMenu)
    tray.on('click', () => {
        showMainWindow({ name: 'index' })
    })
}
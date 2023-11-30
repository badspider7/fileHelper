// custom.d.ts

import { IpcRenderer } from "electron";
export interface IElectronAPI {
    loadPreferences: () => Promise<void>,
}


declare global {
    interface Window {
        ipcRenderer: IpcRenderer;
    }
}

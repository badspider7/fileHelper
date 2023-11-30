import router from "@/router";
import IpcRendererEvent = Electron.IpcRendererEvent;



export function setupListener() {
    window.ipcRenderer.on("jumpRoute", (event: IpcRendererEvent, ...args: any[]) => {
        void router.push(args[0] as string | { name: string });
    });

}
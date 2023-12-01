import router from "../router";
import IpcRendererEvent = Electron.IpcRendererEvent;



export function setupListener() {
    window.ipcRenderer.on("jumpRoute", (event: IpcRendererEvent, ...args: any[]) => {
        console.log('render-process', args)
        void router.push(args[0] as string | { name: string });
    });

}
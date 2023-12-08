export default {
    addFile(fileInfo: object) {
        return window.ipcRenderer.invoke('addFile', fileInfo);
    },
    getAllFiles(val) {
        return window.ipcRenderer.invoke('getAllFiles', val);
    },
    updateFileInfo(updatedFileInfo: string) {
        return window.ipcRenderer.invoke('updateFileInfo', updatedFileInfo);
    }
}
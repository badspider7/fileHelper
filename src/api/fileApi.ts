export default {
    addFile(fileInfo: object) {
        return window.ipcRenderer.invoke('addFile', fileInfo);
    },
    getAllFiles(val) {
        return window.ipcRenderer.invoke('getAllFiles', val);
    },
    updateFileInfo(updatedFileInfo: string) {
        return window.ipcRenderer.invoke('updateFileInfo', updatedFileInfo);
    },
    deleteFile(key: number) {
        return window.ipcRenderer.invoke('deleteFile', key);
    },
    getFileById(key: number) {
        return window.ipcRenderer.invoke('getFileById', key);
    }
}
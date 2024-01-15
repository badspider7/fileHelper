export default {
    addFile(fileInfo: object) {
        return window.ipcRenderer.invoke('addFile', fileInfo);
    },
    getAllFiles(val?: any) {
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
    },
    openOnVscode(filePath: string) {
        return window.ipcRenderer.send('openOnVscode', filePath);
    },
    openOnFolder(filePath: string) {
        return window.ipcRenderer.send('openOnFolder', filePath);
    }
}
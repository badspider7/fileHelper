export default {
    searchInExplorer(searchText: string) {
        return window.ipcRenderer.invoke('utils:searchInExplorer', searchText);
    }
}
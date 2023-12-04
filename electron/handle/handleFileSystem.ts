import { dialog } from 'electron'

//打开文件夹
export async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({ title: '打开文件夹', properties: ['openDirectory', 'showHiddenFiles', 'promptToCreate'] })
    if (!canceled) {
        console.log('filePath', filePaths[0])
        return filePaths[0];
    }
}
import { dialog } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import { ipcMain } from "electron";
import fileListDB from '../db/fileList'

//打开文件管理器
/**
 * 
 * @param type  file | folder
 * @returns FielInfo:Object
 */
export async function handleFileopen(event, type: 'file' | 'folder') {
    // let openType = type == 'file' ? 'openFile' : 'openDirectory'
    if (type == 'folder') {
        const { canceled, filePaths } = await dialog.showOpenDialog({ defaultPath: '', title: '打开文件夹', properties: ['openDirectory', 'showHiddenFiles', 'promptToCreate'] })
        if (!canceled) {
            return getCurrentFilesInfo(filePaths[0]);
        }
    } else {
        const { canceled, filePaths } = await dialog.showOpenDialog({ defaultPath: '', title: '打开文件夹', properties: ['openFile', 'showHiddenFiles', 'promptToCreate'] })
        if (!canceled) {
            return getCurrentFilesInfo(filePaths[0]);
        }
    }

}

//判断文件是否存在
export function checkFileExistence(path: string) {
    try {
        // 检查路径是否存在
        const exists = fs.existsSync(path);

        if (exists) {
            // 如果文件存在，则进一步判断它是文件还是目录
            const stats = fs.statSync(path);
            if (stats.isFile()) {
                console.log(`The file '${path}' exists.`);
            } else if (stats.isDirectory()) {
                console.log(`The directory '${path}' exists.`);

                // 列出该目录下所有文件和子目录
                const filesInDirectory = fs.readdirSync(path);

                for (const fileName of filesInDirectory) {
                    // console.log(fileName);
                }
            }

            return true;
        } else {
            console.log(`The path '${path}' does not exist.`);
            return false;
        }
    } catch (error) {
        if (error.code === "ENOENT") {
            console.error("Invalid path or the file/directory doesn't exist.");
        } else {
            console.error("An unkonw error occurred:", error.message);
        }
    }
}


//得到该路径下的所有文件的信息
export function getAllFilesInfo(dirPath: string) {
    function traverseDirectory(currentPath: string) {
        try {
            //判断路径是否存在
            if (!checkFileExistence(currentPath)) {
                return null;
            };
            const items = fs.readdirSync(currentPath);
            const itemsInfo = [];

            for (const item of items) {
                const itemPath = path.join(currentPath, item);
                const stat = fs.statSync(itemPath);

                const itemInfo = {
                    name: item,
                    path: itemPath,
                    size: stat.size,
                    createdAt: stat.ctime,
                    modifiedAt: stat.mtime,
                    isDirectory: stat.isDirectory(),
                    children: []
                };

                if (itemInfo.isDirectory) {
                    itemInfo.children = traverseDirectory(itemPath);
                }

                itemsInfo.push(itemInfo);
            }

            return itemsInfo;
        } catch (error) {
            console.log(error)
        }
    }

    return traverseDirectory(dirPath);
}

//得到该路径的文件或文件夹的所有信息
export function getCurrentFilesInfo(dirPath: string) {
    try {
        //判断路径是否存在
        if (!checkFileExistence(dirPath)) {
            return false;
        };
        const stat = fs.statSync(dirPath);
        const itemInfo = {
            name: path.basename(dirPath),
            path: dirPath,
            size: stat.size,
            createdAt: stat.ctime,
            modifiedAt: stat.mtime,
            isDirectory: stat.isDirectory(),
        }
        return itemInfo;
        // console.log('stat', stat);
    } catch (error) {
        console.log(error)
    }
}

export function setupHandleFile() {
    //添加文件
    ipcMain.handle('addFile', (event, fileInfo) => {
        console.log('addFile', fileInfo)
        return fileListDB.addFile(fileInfo);
    })
    //获取所有文件
    ipcMain.handle('getAllFiles', (event, val) => {
        console.log('getAllFiles', val)
        return fileListDB.getAllFiles(val);
    })

    //修改文件信息
    ipcMain.handle('updateFileInfo', (event, newFileInfo) => {
        console.log('updateFileInfo', newFileInfo);
        let file = JSON.parse(newFileInfo);
        console.log('file', file)
        return fileListDB.updateFile(file.key, file.remarks);
    })

    //删除文件
    ipcMain.handle('deleteFile', (event, key) => {
        console.log('deleteFile', key);
        return fileListDB.deleteFile(key);
    })

    //根据id获取文件信息
    ipcMain.handle('getFileById', (event, key) => {
        console.log('getFileById', key);
        return fileListDB.getFileById(key);
    })
}

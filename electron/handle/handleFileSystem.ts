import { dialog } from 'electron'
import fs from 'node:fs'
import path from 'node:path'

//打开文件夹
export async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({ defaultPath: '', title: '打开文件夹', properties: ['openDirectory', 'showHiddenFiles', 'promptToCreate'] })
    if (!canceled) {
        return getCurrentFilesInfo(filePaths[0]);
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

// const folderPath = '123123';
// const itemsInfo = getAllFilesInfo(folderPath);
// const itemsInfo = getCurrentFilesInfo('D:\\comProject\\BI')
// console.log(itemsInfo);

//输出


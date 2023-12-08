import fileListDB from "./fileList";


export interface DBConfig {
    initTableIfNotExists: Function;
    tableName: string;
    tableVersion: number;
    initData?: () => void;
}

export const initDB = () => {
    console.log('initDB')
    const DBConfig = [fileListDB];
    DBConfig.forEach(item => {
        item.initTableIfNotExists();
        // db.initData();
    });
}

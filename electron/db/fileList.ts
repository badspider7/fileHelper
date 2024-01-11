import { getDB } from "./better-sqlite3";
import Database from "better-sqlite3";

const defaultPageQuery = {
	start: 0,
	size: 50
};


const useDB = (db: Database.Database) => ({
	tableName: 'files',
	tableVersion: 1,
	initTableIfNotExists() {
		db.exec(`create table IF NOT EXISTS fileList
		(
			key integer not null
				constraint test_pk
					primary key autoincrement,
			folderName TEXT not null,
			remarks TEXT,
			size TEXT,
			category TEXT,
			Directory TEXT,
			lastModify TEXT
		);
		`)
	},
	initData() {

	},
	getAllFiles(pageQuery: any = defaultPageQuery) {
		const { start, size } = pageQuery;
		const query = `select * from fileList order by key ASC  limit ${size} offset ${start}`;
		return db.prepare(query).all();
	},
	getFileById(key: number) {
		const insert = db.prepare(`select * from fileList where key = ?`);
		return insert.get(key);
	},
	addFile(fileInfo: any) {
		const insert = db.prepare(`insert into fileList (folderName,remarks,size,category,lastModify,Directory) values (?,?,?,?,?,?)`);
		insert.run(fileInfo.folderName, fileInfo.remarks, fileInfo.size, fileInfo.category, fileInfo.lastModify, fileInfo.Directory);
	},
	deleteFile(key: number) {
		const delStmt = db.prepare("delete from fileList where key = :key");
		delStmt.run({ key: key });
	},
	updateFile(key: number, remarks: string) {
		const update = db.prepare(`update fileList set remarks = :remarks where key = :key`);
		update.run({ key: key, remarks: remarks });
	}
})

const fileListDB = useDB(getDB());

export default fileListDB;
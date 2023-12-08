import { app } from 'electron'
import path from "node:path";
import fs from "node:fs";
import Database from "better-sqlite3";

let db: Database.Database | undefined;
process.on("exit", () => db?.close());


export function getDB() {
    if (db) {
        return db;
    }
    return getSqlite3();
}


function getSqlite3(filename = path.join(app.getPath("userData"), "better-sqlite3.sqlite3")): Database.Database {
    console.log('dbPath', filename)
    db = new Database(filename, { verbose: console.log });
    db.pragma("journal_mode = WAL");
    return db;
}
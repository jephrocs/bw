import {Low} from "lowdb";
import { JSONFile } from 'lowdb/node'
import {join, dirname} from 'path'
import {fileURLToPath} from 'url'


let db;
const __dirname = dirname(fileURLToPath(import.meta.url))

export async function createConnection(){
    
// File path
const file = join(__dirname, '../db.json')
// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
db = new Low(adapter);


await db.read();


db.data ||= { users: [] };

await db.write();
}

export const getConnection = () => db;
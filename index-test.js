import { createDB } from "./index.js";

const db = await createDB('testDB2');
console.log(db);
const coll = await db.createCollection('testCollection');
console.log(coll);
//const coll = await db.getCollection('testCollection');

await coll.createDocument({hello:'weirdgdsd db'});

console.log(await coll.findAll());
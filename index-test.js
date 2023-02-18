import { connect } from "./index.js";

const db = await connect('testDB');
console.log(db);
const coll = await db.getCollection('testCollection');
console.log(coll);
//const coll = await db.getCollection('testCollection');

await coll.createDocument({hello:'weirdgdsd db'});

console.log(await coll.findAll());
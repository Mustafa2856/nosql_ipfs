import db from './operations/index.js';
await db.insertDocument("testDB","testCollection",{hello:'world',w:'tfdsgdsg'});
console.log(await db.findDocuments("testDB","testCollection",{}));
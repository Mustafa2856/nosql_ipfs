import db from './operations/index.js';
// await db.createCollection("testCollection","testDB");
// await db.insertDocument("testDB","testCollection",{hello:'world'});
// console.log(await db.deleteDocuments("testDB","testCollection",{}));

await db.updateDocuments("testDB", "testCollection", {},{hi:"aswell","aa.bb.cc":"byebye"});
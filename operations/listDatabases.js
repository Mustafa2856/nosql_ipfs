import fileStore from "../services/filestore.js";

export const listDatabases = async () => {
    let dbs = await fileStore.listFiles('/');
    let dbNameList = [];
    for (const db of dbs) {
        dbNameList.push(db.name);
    }
    return dbNameList;
}
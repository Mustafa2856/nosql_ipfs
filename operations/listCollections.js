import fileStore from "../services/filestore.js";

export const listCollections = async (db) => {
    let collections = await fileStore.listFiles("/"+db);
    let collectionNameList = [];
    for (const coll of collections) {
        collectionNameList.push(coll.name);
    }
    return collectionNameList;
}
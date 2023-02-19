import { findDocuments } from "./findDocuments.js";
import { safeString } from "../services/security.js";
import crypto from 'crypto';
import fileStore from "../services/filestore.js";
import { insertDocument } from "./insertDocument.js";

export const updateDocument = async (database, collection, filter, update) => {
    database = safeString(database);
    collection = safeString(collection);
    const keys = Object.keys(update);
    const toUpdate = await findDocuments(database, collection, filter);
    if (toUpdate.length > 0) {
        const object = toUpdate[0];
        const filePathtoHash = collection + JSON.stringify(object);
        const filePathBuffer = await crypto.subtle.digest("SHA-256", Buffer.from(filePathtoHash));
        const filePath = Buffer.from(filePathBuffer).toString('base64url');
        fileStore.deleteFile("/" + database + "/" + collection + "/" + filePath);
        let updatedObject = object;
        for (const key of keys) {
            updatedObject = updateKeyOfObject(updatedObject, update, key);
        }
        insertDocument(database, collection, updatedObject);
    }
}

const updateKeyOfObject = (object, update, key) => {
    const keyPath = key.split('.');
    let toCheckObject = object;
    let slicedKeyPath = keyPath.slice(0, -1);
    for (const keyPart of slicedKeyPath) {
        if (toCheckObject[keyPart] == undefined || typeof toCheckObject[keyPart] != Object)
            toCheckObject[keyPart] = {};
        toCheckObject = toCheckObject[keyPart];
    }
    toCheckObject[keyPath[keyPath.length - 1]] = update[key];
    return object;
}
import fileStore from "../services/filestore.js";
import { safeString } from "../services/security.js";
import crypto from 'crypto';

export const insertDocument = async (database, collection, object) => {
    database = safeString(database);
    collection = safeString(collection);
    const filePathtoHash = collection + JSON.stringify(object);
    const filePathBuffer = await crypto.subtle.digest("SHA-256", Buffer.from(filePathtoHash));
    const filePath = Buffer.from(filePathBuffer).toString('base64url');
    fileStore.addFile("/" + database + "/" + collection + "/" + filePath, JSON.stringify(object));
}
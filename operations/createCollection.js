import fileStore from "../services/filestore.js";
import { safeString } from "../services/security.js";

export const createCollection = async (name, database) => {
    name = safeString(name);
    database = safeString(database);
    await fileStore.createDir("/"+database+"/"+name);
}

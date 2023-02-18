import fileStore from "../services/filestore.js";
import { safeString } from "../services/security.js";

export const createDatabase = async (name) => {
    name = safeString(name);
    await fileStore.createDir("/" + name);
}
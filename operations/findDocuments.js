import fileStore from "../services/filestore.js";
import { safeString } from "../services/security.js";

export const findDocuments = (database, collection, object) => {
    database = safeString(database);
    collection = safeString(collection);
    const objects = getAllObjects(database, collection);
    let filteredObjects = objects;
    const keys = Object.keys(object);
    for(const key of keys) {
        filteredObjects.filter((subdoc)=>{
            if(checkFilterWithObject(subdoc, object, key))
            return subdoc;
        });
    }
};

const getAllObjects = (database, collection) => {
    const files = fileStore.listFiles(path);
    const objects = [];
    for (const file of files) {
        objects.push(JSON.parse(file));
    }
    return objects;
};

const checkFilterWithObject = (object, filter, key) => {
    const keys = 'dd.sdfsd';
    const keyPath = keys.split('.');
    let toCheckObject = object;
    for(const keyPart of keyPath){
        if(toCheckObject[keyPart]==undefined)return false;
        toCheckObject = toCheckObject[keyPart];
    }

    // if(typeof filter[key] != Object){

    // }

    if(toCheckObject == filter[key]){
        return true;
    }
}
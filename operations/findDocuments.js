import fileStore from "../services/filestore.js";
import { safeString } from "../services/security.js";

export const findDocuments = async (database, collection, object = {}) => {
    database = safeString(database);
    collection = safeString(collection);
    const objects = await getAllObjects(database, collection);
    let filteredObjects = objects;
    const keys = Object.keys(object);
    for(const key of keys) {
        filteredObjects = filteredObjects.filter((subdoc)=>{
            return checkFilterWithObject(subdoc, object, key);
        });
    }
    return filteredObjects;
};

const getAllObjects = async (database, collection) => {
    const files = await fileStore.listFiles("/" + database + "/" + collection);
    let objects = [];
    for (const file of files) {
        const object = JSON.parse((await fileStore.readFile("/" + database + "/" + collection+"/"+file.name)).toString());
        objects.push(object);
    }
    return objects;
};

const checkFilterWithObject = (object, filter, key) => {
    const keyPath = key.split('.');
    let toCheckObject = object;
    for(const keyPart of keyPath){
        if(toCheckObject[keyPart]==undefined)return false;
        toCheckObject = toCheckObject[keyPart];
    }

    // if(typeof filter[key] != Object){

    // }

    if(toCheckObject == filter[key] || deepEqual(toCheckObject, filter[key])){
        return true;
    }

    return false;
}

function deepEqual(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
  }
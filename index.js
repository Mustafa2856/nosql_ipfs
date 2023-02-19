import _db from "./operations/index.js";
import { safeString } from "./services/security.js";

class database {
    dbName = "";

    constructor(dbName) {
        dbName = safeString(dbName);
        this.dbName = dbName;
    }
    
    async create() {
        return await _db.createDatabase(this.dbName);
    }

    async createCollection(collectionName) {
        collectionName = safeString(collectionName);
        await _db.createCollection(collectionName, this.dbName);
        return new collection(this, collectionName);
    }

    async listCollections() {
        return await _db.listCollections(this.dbName);
    }

    async getCollection(collectionName) {
        collectionName = safeString(collectionName);
        if((await this.listCollections()).includes(collectionName)){
            return new collection(this, collectionName);
        }else return null;
    }

}

class collection {
    db = new database("");
    collName = "";
    
    constructor(db,collName) {
        this.db = db;
        this.collName = collName;
    }

    /**
     * Creates a collection with the name given in constructor if the database exists.
     */
    async create() {
        return await _db.createCollection(this.db.dbName, this.collName);
    }

    /**
     * 
     * @param {*} document Object to be stored in the document
     */
    async createDocument(document) {
        console.log(this.db)
        return await _db.insertDocument(this.db.dbName, this.collName, document);
    }

    async findAll() {
        return await _db.findDocuments(this.db.dbName, this.collName,{});
    }

    async findFiltered(filter) {
        return await _db.findDocuments(this.db.dbName, this.collName,filter);
    }

    async findFilteredFirst(filter) {
        const list = await _db.findDocuments(this.db.dbName, this.collName,filter);
        if(list.length > 0)return list[0];
        else return null;
    }

    /**
     * 
     * @param {*} filter filter object, set as {} for updateAll
     */
    async updateDocuments(filter = {}) {
        return await  _db.updateDocuments(this.db.dbName, this.collName, filter);
    }

    /**
     * WARNING: Leaving filter empty will result in deleting All documents in the collection.
     * @param {*} filter filter object
     */
    async deleteDocuments(filter = {}) {
        return await _db.deleteDocuments(this.db.dbName, this.collName, filter);
    }

    /**
     * WARNING: Leaving filter empty will result in deleting random documents in the collection.
     * @param {*} filter filter object
     */
    async deleteOneDocument(filter = {}) {
        return await _db.deleteDocument(this.db.dbName, this.collName, filter);
    }
}

export const createDB = async (dbName) => {
    const db = new database(dbName);
    await db.create();
    return db;
}

export const connect = async (dbName) => {
    const db = new database(dbName);
    return db;
}

//export default {createDB};
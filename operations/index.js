import { createCollection } from './createCollection.js';
import { insertDocument } from './insertDocument.js';
import { findDocuments } from './findDocuments.js';
import { deleteDocuments } from './deleteDocument.js';
import { updateDocuments } from './updateDocuments.js';
import { listDatabases } from './listDatabases.js';
import { listCollections } from './listCollections.js';
import { createDatabase } from './createDatabase.js';

export default {
    createCollection,
    insertDocument,
    findDocuments,
    deleteDocuments,
    updateDocuments,
    listDatabases,
    listCollections,
    createDatabase
};
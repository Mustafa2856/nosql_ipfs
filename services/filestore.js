import { create } from 'ipfs-http-client';
import crypto from 'crypto';

const IV = Buffer.from("1234567890abcdef");

const ipfs = create('http://localhost:5001/api/v0');

const SECRET = "--- SECRET KEY ---";
const getAESKey = async (secret) => {
    let encoder = new TextEncoder();
    let secretKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );
    let AESKey = await crypto.subtle.deriveKey({
        "name": "PBKDF2",
        salt: IV,
        "iterations": 100000,
        "hash": "SHA-256"
    },
        secretKey,
        { "name": "AES-CBC", "length": 256 },
        true,
        ["encrypt", "decrypt"]
    );
    return AESKey;
}
const key = await getAESKey(SECRET);

const addFile = async (path, content) => {
    try {
        const encryptedContent = await crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv: IV,
            },
            key,
            content
        );
        await ipfs.files.write(path, encryptedContent, { create: true });
    } catch (e) { console.log('error write: ', path); }
}


const updateFile = async (path, content) => {
    try {
        await deleteFile(path);
        await addFile(path, content);
    } catch (e) { console.log('error update: ', path); }
}

const deleteFile = async (path) => {
    try {
        await ipfs.files.rm(path);
    } catch (e) { console.log('error delete: ', path); }
}

const createDir = async (path) => {
    try {
        await ipfs.files.mkdir(path, { parents: true });
    } catch (e) { console.log('error createDir: ', path); }
}

const listFiles = async (path) => {
    try {
        const files = [];
        for await (const file of ipfs.files.ls(path)) {
            files.push(file);
        }
        return files;
    } catch (e) { console.log('error listFiles: ', path); return []; }
}

const readFile = async (path) => {
    try {
        let chunks = []

        for await (const chunk of ipfs.files.read(path)) {
            chunks.push(...chunk);
        }

        const data = Buffer.from(chunks);
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: IV,
            },
            key,
            data
        );
        return Buffer.from(decryptedData);
    } catch (e) { console.log('error readFile: ', path); }
}

const fileStore = { addFile, updateFile, deleteFile, createDir, listFiles, readFile };

export default fileStore;
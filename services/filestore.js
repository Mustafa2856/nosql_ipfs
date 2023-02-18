import { create } from 'ipfs-http-client';

const IV = Buffer.from("1234567890abcdef");

const ipfs = create('http://localhost:5001/api/v0');

const addFile  = async (key, path, content) => {
    const encryptedContent = await crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: IV,
        },
        key,
        content
    );
    await ipfs.files.write(path, encryptedContent);
}

const updateFile = async (key, path, content) => {
    await deleteFile(path);
    await addFile(key, path, content)
}

const deleteFile = async (path) => {
    await ipfs.files.rm(path);
}

const createDir = async (path) => {
    await ipfs.files.mkdir(path, {parents: true});
}
import { create } from 'ipfs-http-client';

const IV = Buffer.from("1234567890abcdef");

const ipfs = create('http://localhost:5001/api/v0');

//const key = Buffer.from({0}); // TODO get user aes key

const addFile  = async (path, content) => {
    // key = Buffer.from(key);
    // const encryptedContent = await crypto.subtle.encrypt(
    //     {
    //         name: "AES-CBC",
    //         iv: IV,
    //     },
    //     key,
    //     content
    // );
    // await ipfs.files.write(path, encryptedContent);
    //await ipfs.files.touch('/test/a.txt');
    await ipfs.files.write(path, content, {create: true});
}


const updateFile = async (path, content) => {
    await deleteFile(path);
    await addFile(path, content);
}

const deleteFile = async (path) => {
    await ipfs.files.rm(path);
}

const createDir = async (path) => {
    await ipfs.files.mkdir(path, {parents: true});
}

const listFiles = async (path) => {
    const files = [];
    for await (const file of ipfs.files.ls(path)) {
        files.push(file);
    }
    return files;
}

const fileStore = {addFile, updateFile, deleteFile, createDir, listFiles};

export default fileStore;
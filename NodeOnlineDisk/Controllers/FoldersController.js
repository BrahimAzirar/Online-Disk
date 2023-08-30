const { ObjectId } = require('mongodb');
const { FoldersModel } = require('../Models/FoldersModel');

const getMainFolder = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const username = req.params.username;
        const result = await FoldersModel.GetData(db, { path: 'Home/', member: username });
        res.status(200).json({ response: result[0] });
    } catch (error) {
        console.log(`The error from FoldersController.js in getMainFolder: ${error.message}`);
        res.json({ err: 'Error in the server try later !!!' });
    };
};

const AddFolder = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const newFolder = req.body.folder;
        const result = await FoldersModel.InsertData(db, newFolder);
        await FoldersModel
            .UpdateData(db, { path: req.body.where }, {
                $push: { content: { folderId: result, type: 'folder' } } 
            });
        res.status(200).json({ response: {folderId: result, type: 'folder'} });
    } catch (error) {
        console.log(`The error from FoldersController.js in AddFolder: ${error.message}`);
        res.json({ err: 'Error in the server try later !!!' });
    }
};

const GetFolderData = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const id = req.params.folderId;
        const result = await FoldersModel.GetData(db, { _id: new ObjectId(id) });
        res.status(200).json({ response: result[0] });
    } catch (error) {
        console.log(`The error from FoldersController.js in GetFolderData: ${error.message}`);
        res.json({ err: 'Error in the server try later !!!' });
    }
};

module.exports = { getMainFolder, AddFolder, GetFolderData };
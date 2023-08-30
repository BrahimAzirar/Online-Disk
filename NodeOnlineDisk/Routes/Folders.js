const ex = require('express');
const folders = ex.Router();
const FoldersController = require('../Controllers/FoldersController');
const FoldersMiddleware = require('../Middlewares/FoldersMiddleware');

//////////// Middleware ////////////



//////////// Api ////////////

folders.get('/getMainFolder/:username', FoldersController.getMainFolder);
folders.post('/AddFolder', FoldersController.AddFolder);
folders.get('/foldersData/:folderId', FoldersController.GetFolderData);

module.exports = folders;
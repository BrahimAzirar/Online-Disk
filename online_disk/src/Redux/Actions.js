import types from './Types';

const AddFolderAction = (folderdata) => {
    return { type: types.ADD_NEW_fOLDER, payload: folderdata };
};

export default { AddFolderAction };
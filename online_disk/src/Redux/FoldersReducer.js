import types from './Types';

const init = {
    data: []
};

const FoldersReducer = (state = init, action) => {

    if (action.type === types.ADD_NEW_fOLDER) {
        return { ...state, data: [ ...state.data, action.payload ] };   
    }

    return state;
};

export default FoldersReducer;
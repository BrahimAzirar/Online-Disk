import { legacy_createStore as CreateStore, combineReducers } from 'redux';
import FoldersReducer from './FoldersReducer';

const root = combineReducers({ FoldersReducer });

const store = CreateStore(root);

export default store;
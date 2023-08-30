import React, { useEffect, useState } from 'react';
import { FaFolder } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Content({ data, elementKey }) {

    const GlobalState = useSelector(state => state.FoldersReducer.data);
    const [Folder_File_Name, setGlobalState] = useState('');

    useEffect(() => {
        if (GlobalState.length) {
            const folderData = GlobalState.find(ele => ele._id === data.folderId);
            if (folderData) setGlobalState(folderData.name);
        }
    }, [GlobalState]);

  return (
    <div id='Content' key={elementKey}>
        <div>
            { data.type === 'folder' ? <FaFolder /> : null }
        </div>
        <p>{ Folder_File_Name }</p>
    </div>
  );
};


export function _BeforeAddNewFolder ({ data, callback }) {

    const [folderName, setfolderName] = useState(data.name);

    const handelInputValue = (e) => setfolderName(e.target.value);
    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
          try {
            data.folder.path = data.folder.path.replace(data.folder.name, folderName);
            data.folder.name = folderName;
            const result = (await axios.post('http://localhost:3500/folders/AddFolder', data)).data;
            if (result.err) throw new Error(result.err);
            callback.AddFolder({ Show: false });
            callback.content(prev => [...prev, result.response]);
            if (data.where === "Home/") callback.sidebar(prev => [...prev, result.response]);
          } catch (error) {
            alert(error.message);
          }
        };
      };

    return (
        <div id='Content'>
            <div> <FaFolder /> </div>
            <input type='text' value={folderName} onChange={handelInputValue} onKeyDown={handleKeyPress}/>
        </div>
    );
}
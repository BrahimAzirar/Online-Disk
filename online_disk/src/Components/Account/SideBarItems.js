import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFolder } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Action from '../../Redux/Actions';

export default function SideBarItems({ folderId, reference }) {

  const dispatch = useDispatch();

  const [Items, setItems] = useState([]);

  useEffect(() => {
      axios.get(`http://localhost:3500/folders/foldersData/${folderId}`)
          .then(res => {
            setItems(res.data.response);
            dispatch(Action.AddFolderAction(res.data.response));
          })
          .catch(err => alert(err.message));
  }, []);

  return <li key={reference}> <FaFolder /> <p>{ Items.name }</p> </li>;
};

export function _BeforeAddFolder({ obj, callcack }) {

  const [folderName, setfolderName] = useState(obj.name);

  const handelInputValue = (e) => setfolderName(e.target.value);
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      try {
        obj.folder.path = obj.folder.path.replace(obj.folder.name, folderName);
        obj.folder.name = folderName;
        const result = (await axios.post('http://localhost:3500/folders/AddFolder', obj)).data;
        if (result.err) throw new Error(result.err);
        callcack.beforeAddFolder({ Show: false });
        callcack.sidebar(prev => [...prev, result.response]);
        callcack.content(prev => [...prev, result.response]);
      } catch (error) {
        alert(error.message);
      }
    };
  };

  return (
    <li>
      <FaFolder />
      <input type='text' value={folderName} onChange={handelInputValue} onKeyDown={handleKeyPress}/>
    </li>
  );
};
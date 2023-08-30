import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { AiFillSetting, AiOutlinePlusCircle, AiTwotoneDelete, AiFillFolderAdd, AiFillFileAdd } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import { FaFolder } from 'react-icons/fa';
import { MdPublishedWithChanges } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { GrInstallOption } from 'react-icons/gr';
import SideBarItems, { _BeforeAddFolder } from './SideBarItems';
import _Content, { _BeforeAddNewFolder } from './Content';

export default function MemberAccount() {

  const [SideBar, setSideBar] = useState([]);
  const [Path, setPath] = useState('');
  const [Content, setContent] = useState([]);
  const [MemberData, setMemberData] = useState([]);
  const [BeforeAddFolder, setBeforeAddFolder] = useState({ Show: false });
  const [AddFolder, setAddFolder] = useState({ Show: false });
  const username = useParams().username;
  const redirect = useNavigate();

  const NavBar = useRef();

  useEffect(() => {
    document.title = 'Account | Online Disk';

    axios.get(`http://localhost:3500/auth/isAuth`, { withCredentials: true })
      .then(res => res.data.response ? setMemberData(res.data.user) : redirect('/'))
      .catch(err => alert(err.message));

    axios.get(`http://localhost:3500/folders/getMainFolder/${username}`)
      .then(res => {
        setSideBar(() => res.data.response.content.filter(ele => ele.type === 'folder'));
        setPath(res.data.response.path); setContent(res.data.response.content);
      })
      .catch(err => alert(err.message));
  }, []);


  const LogOut = async () => {
    console.log('clicked');
    try {
      const result = (await axios.get('http://localhost:3500/auth/logout', { withCredentials: true })).data;
      if (result.err) throw new Error(result.err);
      if (result.response) redirect('/');
    } catch (error) {
      alert(error.message)
    }
  }

  const CreateFolderFromSidebar = () => {
    const FolderData = {
      folder: { name: 'folder', member: username, path: `${Path}folder/`, content: [] },
      where: Path
    };
    
    setBeforeAddFolder({ 
      Show: !BeforeAddFolder.Show, data:FolderData, adjustState: { 
        sidebar: setSideBar, beforeAddFolder: setBeforeAddFolder, content: setContent
      }
    });
  };

  const AddNewFolder = () => {
    const FolderData = {
      folder: { name: 'folder', member: username, path: `${Path}folder/`, content: [] },
      where: Path
    };

    setAddFolder({
      Show: !AddFolder.Show, data: FolderData, adjustState: {
        sidebar: setSideBar, AddFolder: setAddFolder, content: setContent
      }
    })
  };

  return (
    <div id='Account'>
      <div>
        <div>
          <h1>Online Disk | {username}</h1>
          <div id='usermenu' onClick={() => NavBar.current.classList.toggle('Hide')}>
            <div>
              <div id='avatar'> 
                { MemberData.avatar ? <img src={MemberData.avatar} /> : <RxAvatar /> }
              </div>
              <p style={{ textAlign: "center" }}>{MemberData.firstname} {MemberData.lastname}</p>
            </div>
            <ul id='navBar' className='Hide' ref={NavBar}>
              <li> <a href='#'><p>Settings</p> <AiFillSetting /></a> </li>
              <li onClick={LogOut}> <a href='#'><p>Log out</p> <TbLogout /></a> </li>
            </ul>
          </div>
        </div>
        <p id='paragraph'>levate your data management with our secure online storage service. Access your files anytime, anywhere, with cutting-edge encryption ensuring your data's safety. Streamline collaboration and convenience, embracing the future of efficient cloud storage.</p>
      </div>
      <div>
        <div>
          <div id='newFolder'> <button onClick={CreateFolderFromSidebar}><p>New</p> <AiOutlinePlusCircle /></button> </div>
          <ul>
            <li className='Active'> <FaFolder /> <p>Home</p> </li>
            { SideBar.length ? SideBar.map((ele, idx) => <SideBarItems folderId={ele.folderId} reference={idx} />) : null}
            { BeforeAddFolder.Show && <_BeforeAddFolder obj={BeforeAddFolder.data} callcack={BeforeAddFolder.adjustState}/> }
          </ul>
        </div>
        <div id='FoldersContent'>
          <div>
            <div> { Path } </div>
            <div> <input type='text' placeholder='Search'/> </div>
          </div>
          <div id='Operation'>
            <div>
              <p>Delete</p>
              <AiTwotoneDelete />
            </div>
            <div>
              <p>Rename</p>
              <MdPublishedWithChanges />
            </div>
            <div>
              <p>Downoald</p>
              <GrInstallOption />
            </div>
            <div onClick={AddNewFolder}>
              <p>Add Folder</p>
              <AiFillFolderAdd />
            </div>
            <div>
              <p>Add File</p>
              <AiFillFileAdd />
              <input type='file' style={{ display: "none" }} />
            </div>
          </div>
          <div> 
            { Content.length ? 
              Content.map((ele, idx) => <_Content data={ele} elementKey={idx} />): 
              <p className='alertParagraph'>No files or folders ...</p> }

            { AddFolder.Show && <_BeforeAddNewFolder data={AddFolder.data} callback={AddFolder.adjustState} /> }
          </div>
        </div>
      </div>
    </div>
  );
};
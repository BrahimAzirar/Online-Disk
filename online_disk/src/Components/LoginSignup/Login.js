import React, { useEffect, useRef } from 'react';
import { BiLogIn, BiUserCircle } from 'react-icons/bi';
import axios from 'axios';
import '../../App.css';

export default function Login() {

  const LoginForm = useRef();

  useEffect(() => {
    document.title = 'Login | Online Disk';
  }, []);

  const LogIn = async () => {
    const formdata = new FormData(LoginForm.current);
    const data = (await axios.post('http://localhost:8000/api/CheckMember', formdata)).data;
  };

  return (
    <div id='FromLoginJs' className='InContentCenter'>
      <form id='formLogin' ref={LoginForm}>
        <div>
          <BiUserCircle />
          <h2>Login | Online Disk</h2>
        </div>
        <div>
          <input type='text' name='UserName_Email' placeholder='Username or Email'/>
        </div>
        <div>
          <input type='password' name='Password' placeholder='Password'/>
        </div>
        <div>
          <button type='button' className='InContentCenter' onClick={LogIn}>
            <p>Log in</p>
            <BiLogIn />
          </button>
        </div>
        <div>
          <a href='/NewAccount'>New Account</a>
          <a href='#'>Are you forget your password ?</a>
        </div>
      </form>
    </div>
  );
};
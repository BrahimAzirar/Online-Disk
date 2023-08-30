import React, { useEffect, useRef, useState } from 'react';
import { BiLogIn, BiUserCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import axios from 'axios';
import '../../App.css';

export default function Login() {

  const [ShowAlert, setShowAlert] = useState(false);
  const [error, seterror] = useState('');

  const LoginForm = useRef();
  const redirect = useNavigate();

  useEffect(() => {
    document.title = 'Login | Online Disk';

    axios.get(`http://localhost:3500/auth/isAuth`, { withCredentials: true })
      .then(res => res.data.response ? redirect(`/Member/Account/${res.data.user.username}`) : null)
      .catch(error => {
        setShowAlert(true);
        seterror(error.messsage);
      });
  }, []);

  const LogIn = async (e) => {
    e.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(LoginForm.current));
      const CheckInputIsNotEmpty = () => {
        return Object.values(data).some(ele => ele === '');
      };

      if (CheckInputIsNotEmpty()) throw new Error("Some fields is empty !");
      const result = (await axios.post('http://localhost:3500/auth/login', data, { withCredentials: true })).data;
      if (result.err) throw new Error(result.err);
      if (result.response) redirect(result.nextPage);
      else {
        const regex = /[a-zA-z0-9]@(gmail|yahoo|outlook|hotmail|aol|icloud|protonmail).com/g;
        if (data.UserName_Email.match(regex) === null) throw new Error('The username or password incorect !!!');
        else throw new Error('The email or password incorect !!!');
      };
    } catch (error) {
      setShowAlert(true);
      seterror(error.message);
    };
  };

  const ShowHideAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 7000);
    return <Alert errMessage={error} />;
  };

  return (
    <div id='FromLoginJs' className='InContentCenter'>
      { ShowAlert ? ShowHideAlert() : null }
      <form id='formLogin' ref={LoginForm}>
        <div>
          <BiUserCircle />
          <h2>Login | Online Disk</h2>
        </div>
        <div>
          <input type='text' name='UserName_Email' placeholder='Username or Email'/>
        </div>
        <div>
          <input type='password' name='password' placeholder='Password'/>
        </div>
        <div>
          <button type='button' className='InContentCenter' onClick={LogIn}>
            <p>Log in</p>
            <BiLogIn />
          </button>
        </div>
        <div>
          <a href='/NewAccount'>New Account</a>
          <a href='/ForgotPassword'>Are you forget your password ?</a>
        </div>
      </form>
    </div>
  );
};
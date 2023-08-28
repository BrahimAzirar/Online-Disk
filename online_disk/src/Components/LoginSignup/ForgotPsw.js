import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import { MdLockReset } from 'react-icons/md';
import { AiOutlineSend } from 'react-icons/ai';

export default function ForgotPsw() {

    const [ShowAlert, setShowAlert] = useState(false);
    const [error, seterror] = useState('');

    const redirect = useNavigate();

    useEffect(() => {
        document.title = 'Forgot password | Online Disk';
    
        axios.get(`http://localhost:3500/auth/isAuth`, { withCredentials: true })
          .then(res => res.data.response ? redirect(`/Member/Account/${res.data.user}`) : null)
          .catch(error => {
            setShowAlert(true);
            seterror(error.messsage);
          });
    }, []);

    const ShowHideAlert = () => {
      setTimeout(() => {
        setShowAlert(false);
      }, 7000);
      return <Alert errMessage={error} />;
    };

  return (
    <div id='ForgotPswPage' className='InContentCenter'>
        { ShowAlert ? ShowHideAlert() : null }
        <form id='formforgotpsw'>
            <div>
                <MdLockReset />
                <h2>Forgot Password | Online Disk</h2>
            </div>
            <div className='DivInputs'>
                <input type='email' name='email' placeholder='Email'/>
            </div>
            <div className='DivInputs'>
                <button className='InContentCenter'>                 
                    <p>Send</p>
                    <AiOutlineSend/>
                </button>
            </div>
        </form>
    </div>
  );
};
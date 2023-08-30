import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import { MdLockReset } from 'react-icons/md';
import { AiOutlineSend } from 'react-icons/ai';

export default function ForgotPsw() {

    const [ShowAlert, setShowAlert] = useState(false);
    const [error, seterror] = useState('');
    const [verifyCode, setverifyCode] = useState(false);

    const emailInput = useRef();
    const redirect = useNavigate();

    useEffect(() => {
        document.title = 'Forgot password | Online Disk';
    
        axios.get(`http://localhost:3500/auth/isAuth`, { withCredentials: true })
          .then(res => res.data.response ? redirect(`/Member/Account/${res.data.user}`) : null)
          .catch(error => {
            setShowAlert(true);
            seterror(error.message);
          });
    }, []);

    const ShowHideAlert = () => {
      setTimeout(() => {
        setShowAlert(false);
      }, 7000);
      return <Alert errMessage={error} />;
    };

    const CheckEmail = async () => {
      try {
        const email = emailInput.current.value;
        const regex = /[a-zA-z0-9]@(gmail|yahoo|outlook|hotmail|aol|icloud|protonmail).com/g;
        if (email.match(regex) === null) throw new Error('This email not valid !!!');
        const result = (await axios.get(`http://localhost:3500/auth/emailIsExist/${email}`)).data;
        if (result.err) throw new Error(result.err);
        else setverifyCode(true);
      } catch (error) {
        setShowAlert(true); seterror(error.message);
      };
    };

    const ForgetPswOperations = async (e) => {
      e.preventDefault();
      await CheckEmail();
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
                <input type='email' ref={emailInput} placeholder='Email'/>
            </div>
            {
              verifyCode ?
              <div className='DivInputs DivVerfifyCode'>
                <label htmlFor='code'>We sended you the verification code in you email .</label>
                <input type='text' id='code' placeholder='Verfication code'/>
              </div> : null
            }
            <div className='DivInputs'>
                <button className='InContentCenter' onClick={ForgetPswOperations}>                 
                    <p>Send</p>
                    <AiOutlineSend/>
                </button>
            </div>
        </form>
    </div>
  );
};
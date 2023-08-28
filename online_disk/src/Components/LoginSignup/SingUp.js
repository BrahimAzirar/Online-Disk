import React, {useEffect, useRef, useState} from 'react';
import { FiUserPlus } from 'react-icons/fi';
import '../../App.css';
import Alert from './Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  const [ShowAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "SignUp | Online Disk";
  }, []);

  const SignUpForm = useRef(), ConPass = useRef();
  const redirect = useNavigate();

  const SignUpToAccount = async (e) => {
    e.preventDefault();
    const formdata = new FormData(SignUpForm.current);
    const data = Object.fromEntries(formdata); data.email_verfy = false;

    const CheckPassword = () => {
      const pass = data.password;
      const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+}{|?><'";
      const nums = "0123456789";

      return (
        pass.length >= 8 && alph.split('').some(ele => pass.includes(ele)) &&
          nums.split('').some(ele => pass.includes(ele))
        );
    };

    const CheckInputIsNotEmpty = () => {
      return Object.values(data).some(ele => ele === '');
    };

    const emailIsValid = () => {
      const regex = /[a-zA-z0-9]@(gmail|yahoo|outlook|hotmail|aol|icloud|protonmail).com/g;
      if (data.email.match(regex) === null) return false;
      else return true
    };

    try {
      if (CheckInputIsNotEmpty()) throw new Error("Some fields is empty !");

      if (!(data.password === ConPass.current.value))
        throw new Error('The password not valide !!!');

      if (!(CheckPassword())) 
        throw new Error("The password must be his length >= 8 and contains a letters upper case or some symbols (#-!_ &) and some numbers ");

      if (!emailIsValid()) throw new Error('The email not valid !!');

      const result = (await axios.post('http://localhost:3500/auth//register/member', data)).data;

      if (result.nextPage) redirect(result.nextPage);

      if (result.err) throw new Error(result.err);
    } catch (err) {
      setError(err.message); setShowAlert(true);
    }
  };

  const ShowHideAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 7000);
    return <Alert errMessage={error} />;
  };

  return (
    <div id='FromSignUpJs' className='InContentCenter'>
      { ShowAlert ? ShowHideAlert() : null }
      <form id='formsignUp' ref={SignUpForm}>
        <div>
          <FiUserPlus />
          <h2>SignUp | Online Disk</h2>
        </div>
        <div>
          <div className='InContentCenter'>
            <input type='text' name='username' placeholder='Username'/>
          </div>
          <div className='InContentCenter'>
            <input type='text' name='firstname' placeholder='First Name'/>
          </div>
          <div className='InContentCenter'>
            <input type='text' name='lastname' placeholder='Last Name'/>
          </div>
          <div className='InContentCenter'>
            <input type='email' name='email' placeholder='Email'/>
          </div>
          <div className='InContentCenter'>
            <input type='password' name='password' placeholder='Password'/>
          </div>
          <div className='InContentCenter'>
            <input type='password' ref={ConPass} placeholder='Confirm Password'/>
          </div>
          <div className='InContentCenter'>
            <button type='submit' onClick={SignUpToAccount}>Sing Up</button>
          </div>
        </div>
      </form>
    </div>
  )
};
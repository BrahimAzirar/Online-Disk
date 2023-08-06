import React, {useEffect, useRef, useState} from 'react';
import { FiUserPlus } from 'react-icons/fi';
import '../../App.css';
import Alert from './Alert';
import axios from 'axios';

export default function SignUp() {

  const [ShowAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "SignUp | Online Disk";
  }, []);

  const SignUpForm = useRef(), ConPass = useRef();

  const SignUpToAccount = async (e) => {
    e.preventDefault();
    const formdata = new FormData(SignUpForm.current);
    const data = Object.fromEntries(formdata);

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

    try {
      if (!(data.password === ConPass.current.value))
        throw new Error('The password not valide !!!');

      if (!(CheckPassword())) 
        throw new Error("The password must be his length greater or equal to 8 and contains a letters upper case and some numbers and some symbols (#-!_ &) ");

      if (CheckInputIsNotEmpty()) throw new Error("Some fields is empty !");

      const result = (await axios.post('http://localhost:3500/auth/Signup', data)).data;

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
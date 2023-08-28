import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Components/LoginSignup/Login';
import SignUp from './Components/LoginSignup/SingUp';
import EmailVerification from './Components/LoginSignup/EmailVerification';
import MemberAccount from './Components/Account/MemberAccount';
import ForgotPsw from './Components/LoginSignup/ForgotPsw';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/NewAccount' element={<SignUp />} />
        <Route path='/email_verify/:username' element={<EmailVerification />} />
        <Route path='/Member/Account/:username' element={<MemberAccount />} />
        <Route path='/ForgotPassword' element={<ForgotPsw />} />
      </Routes>
    </>
  );
};

export default App;
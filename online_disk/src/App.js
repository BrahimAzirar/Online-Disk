import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Components/LoginSignup/Login';
import SignUp from './Components/LoginSignup/SingUp';
import EmailVerification from './Components/LoginSignup/EmailVerification';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/NewAccount' element={<SignUp />} />
        <Route path='/email_verify/:username' element={<EmailVerification />} />
      </Routes>
    </>
  );
};

export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Components/LoginSignup/Login';
import SignUp from './Components/LoginSignup/SingUp';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='NewAccount' element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
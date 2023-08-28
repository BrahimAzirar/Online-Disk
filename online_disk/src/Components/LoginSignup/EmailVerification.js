import React, { useEffect, useState } from 'react';
import { RiMailCheckFill } from 'react-icons/ri';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from './Alert';

export default function EmailVerification() {

  const [Err, setErr] = useState({ err: false });

  const username = useParams().username;
  const redirect = useNavigate();

  console.log(Err);

  useEffect(() => {
    axios.get(`http://localhost:3500/auth/userIsExist/${username}`)
      .then(res => {
        if (res.data.check) {
          axios.get(`http://localhost:3500/auth/SendEmailVerification/${username}`);
        } else {
          redirect('/');
        };
      })
      .catch(err => setErr({ err: true, mess: err.message }));
  }, []);

  return (
    <div id='ContentPage'>
      { Err.err && <Alert errMessage={Err.mess} /> }
      <div id='EmailVerify'>
        <div>
            <RiMailCheckFill />
        </div>
        <div>
          <h2>Verify you email</h2>
          <p>Please verify your email to start using our services by clicking the link we've sent to your inbox.</p>
        </div>
      </div>
    </div>
  );
};
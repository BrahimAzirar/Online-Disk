import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MemberAccount() {

  const username = useParams().username;
  const redirect = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3500/auth/isAuth`, { withCredentials: true })
      .then(res => res.data.response ? null : redirect('/'))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <div>MemberAccount</div>
  )
}
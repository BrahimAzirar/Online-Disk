import React from 'react';

export default function Alert({ errMessage}) {
  return (
    <div id='alert'>
        <p>{ errMessage }</p>
    </div>
  );
};
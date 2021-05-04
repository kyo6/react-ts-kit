import React from 'react';

interface ButtonProps  {
  type: 'primary' | 'success'
}

const Button = (props: ButtonProps) => {
  const {type} = props;
  return <button></button>
}
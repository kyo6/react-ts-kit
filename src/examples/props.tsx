import React from 'react'

//Props
interface GreetingProps  {
  name: string;
};

function Greeting(props: GreetingProps) {
  return <p>Hi {props.name} 👋</p>
}

//Destructuring makes it even more readable
function Greeting1({name}: GreetingProps) {
  return <p>Hi {name} 👋</p> 
}

// Default Props
interface LoginProps  {
  name?: string 
}
function LoginMsg({name = 'Guest'}: LoginProps) {
  return <p>Logged in as {name}</p>; 
}
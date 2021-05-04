import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import {CountdownTimer, Input} from '../../components'
const Home = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  function handleClick () {
    if(emailRef.current) {
      console.log(emailRef.current)
      emailRef.current.focus()
    }
  }
  console.log('render Home')
  return <div>
    <div>
      <Link to="/sharepoint/123"> 动态路由 </Link>
    </div>
    <CountdownTimer/>
    <div>
    
    <Input id="email" name="email" type="text" ref={emailRef} />
    </div>
  
    <input type="button" value="Focus the text input" onClick={handleClick}/>
    </div>
}

export default Home
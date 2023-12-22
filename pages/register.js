import { useState } from "react";
import axios from "axios";
import NavBarxx from '../comps/NavBarxx'

export default function Register() {

  const [ registerUsername, setRegisterUsername, ] = useState('');
  const [ registerPassword, setRegisterPassword, ] = useState('');

    const register = () => {
        axios({
            method: "post",
            data: {
                username: registerUsername,
                password: registerPassword
            },
            withCredentials: true,
            url: "http://localhost:4500/register"
        }).then((res) => console.log(res)).catch((err) => console.log(err));
    }

    return (
         <div>
             <NavBarxx></NavBarxx>
           <h1>Register</h1>
             <input type="text" name="username" placeholder="username" onChange={e => setRegisterUsername(e.target.value)}></input>
             <input type="password" name="password" placeholder="password" onChange={e => setRegisterPassword(e.target.value)}></input>
             <button onClick={register}>Register</button>
         </div>
  )
}

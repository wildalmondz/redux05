import { useState } from "react";
import NavBar from '../../../comps/NavBar'
import axios from "axios";

export default function Login() {

  const [ loginEmail, setLoginEmail, ] = useState('');
  const [ loginPassword, setLoginPassword, ] = useState('');

    const login = () => {
        axios({
            method: "post",
            data: {
                email: loginEmail,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:4500/authentication/login_v2"
        }).then((res) => console.log(res)).catch((err) => console.log(err));
    }

    return (
         <div>
             <NavBar></NavBar>
           <h1>Login</h1>
             <input type="text" name="email" placeholder="email" onChange={e => setLoginEmail(e.target.value)}></input>
             <input type="password" name="password" placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
             <button onClick={login}>Login</button>
         </div>
  )
}


/*
	handleSubmit(event) {
		event.preventDefault();
		const sendMessage = this.props.onMessage;
		const hist = this.props.history;

		axios.post('http://localhost:4500/authentication/login_v2', {
			email: this.state.email,
			password: this.state.password,
		})
			.then((response) => {
				// / if the response data is error, then send a message
				// if it is not an error, send
				if (response.data !== 'undefined') {
					if (/^20010/.test(response.data.message)) {
						// sendMessage(response.data); // make sure no message exists
						hist.push('/admin/experience');
					} else {
						console.log('\n\n\nData: ', response.data);
						// hist.push('/owner/dashboard');
						return sendMessage(response.data);
					}
				}
				// if (response.data === 'undefined') {
				//	}
			})
			.catch((error) => {
				console.log(error);
			});
	}

 */
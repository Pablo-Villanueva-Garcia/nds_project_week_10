
import React , {useState} from 'react';
import { loginUser } from '../../hooks/api';


const Login = ({settoken}) =>{

    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
   
    const handleclick = async e => {
        e.preventDefault();
     
        const token = await loginUser({
            email:mail,
            password:password
        });
       
        settoken(token);
    }

    return (
        <div>
            <h1>Login</h1>
            
                <label>
                    <input placeholder="email" type="text" onChange={e=> setMail(e.target.value)}/>
                </label>
                <label>
                    <input placeholder="password" type="text" onChange={e=> setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit" onClick={handleclick}>Submit</button>
                </div>
                <h1>{mail}</h1>
            
        </div>
    )

}


export default Login ; 

import React , {useState} from 'react';
import { loginUser } from '../../hooks/api';


const Login = ({settoken}) =>{

    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
   
    const handleclick = async e => {
        e.preventDefault();
        const token = await loginUser({
            mail,
            password
        });
        settoken(token);
    }

    return (
        <div>
            <h1>Login</h1>
            
                <label>
                    <input type="text" onChange={e=> setMail(e.target.value)}/>
                </label>
                <label>
                    <input type="text" onChange={e=> setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit" onClick={handleclick}>Submit</button>
                </div>
            
        </div>
    )

}


export default Login ; 
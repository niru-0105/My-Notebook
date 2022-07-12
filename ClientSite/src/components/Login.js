import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000"

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit =async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/login`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify({
                email:credentials.email,
                password:credentials.password
            })
        });

        const json = await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate('/')
        }
        else{
            alert('inavlid credentials')
        }
        
    }

    const onChange = (e) => {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" name='email' id="email"  />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={onChange} name='password' className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
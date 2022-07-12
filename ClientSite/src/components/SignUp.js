import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000"

const SignUp = () => {

    const [credentials, setCredentials] = useState({name:"", email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit =async (e) => {
        console.log('In handle submit');
        e.preventDefault();
        console.log('In handle submit');
        const url = `${host}/api/auth/createuser`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify({
                name:credentials.name,
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" onChange={onChange} className="form-control" name='name' id="name"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" name='email' id="email"  />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={onChange} name='password' className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword1" className="form-label">Password</label>
                    <input type="password" onChange={onChange} name='cpassword' className="form-control" id="cpassword1" />
                </div>

                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
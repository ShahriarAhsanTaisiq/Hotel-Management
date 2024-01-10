import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/ApiFunction';
import jwtDecode from 'jwt-decode';


const Login = () => {

    const[errorMessager, setErrorMessager] = useState('')
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setLogin({...login,[e.target.name]: e.target.value})
    }

    const handleLogin = async(e) => {
        e.preventDefault()
        const sucess = await loginUser(login)
        if(sucess){
            const token = sucess.token
            const decodedToken = jwtDecode(token)
            localStorage.setItem('jwtToken', token)
            localStorage.setItem('userId', decodedToken.sub)
            localStorage.setItem('userRole', decodedToken.role)
            navigate('/')
            window.location.reload()          
        }else{
            setErrorMessager('Invalid email or password.Please enter correct email and password')
        }
        setTimeout(() => {
            setErrorMessager('')
        }
        , 4000)
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessager && <div className='alert alert-danger'>{errorMessager}</div>}
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className='row mb-3'>
                    <label htmlFor="email" className='col-sm-2 col-form-label'>Email</label>
                    <div>
                        <input
                            type="email"
                            className='form-control'
                            id='email'
                            name='email'
                            value={login.email}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label htmlFor="password" className='col-sm-2 col-form-label'>Password</label>
                    <div>
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            name='password'
                            value={login.password}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn-hotel' style={{marginRight:"10px"}}>Login</button>
                    <span style={{marginLeft: "10px"}}>Don't have an account yet?
                    <Link to ={"/register"}></Link>
                    </span>
                </div>

            </form>
        </section>
    );
};

export default Login;

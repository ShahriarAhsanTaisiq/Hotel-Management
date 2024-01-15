import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../utils/ApiFunctions';



const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: '',
        lastName: '',  
        email: '',
        password: ''
    })
    const [errorMessager, setErrorMessager] = useState('')
    const [sucessMessager, setSucessMessager] = useState('')

    const handleInputChange = (e) => {
        setRegistration({...registration,[e.target.name]: e.target.value})
    }
    const handleRegistration = async(e) => {
        e.preventDefault()
        const sucess = await registerUser(registration)
        if(sucess){
            setSucessMessager(sucess)
            setRegistration({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            })
        }else{
            setErrorMessager(`Registration failed : ${error.message}`)
        }
        setTimeout(() => {
            setErrorMessager('')
            setSucessMessager('')
        }
        , 4000)
    }
    return (
        <section className='container col-6 mt-5 mb-5'>

            {errorMessager && <div className='alert alert-danger'>{errorMessager}</div>}
            {sucessMessager && <div className='alert alert-success'>{sucessMessager}</div>}
            <h2>Registration</h2>
            <form onSubmit={handleRegistration}>
                <div className='mb-3 row'>
                    <label htmlFor="firstName" className='col-sm-2 col-form-label'>First Name</label>
                    <div>
                        <input 
                        id='firstName'
                        type="text"
                        className='form-control'
                        name='firstName'
                        value={registration.firstName}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="lastName" className='col-sm-2 col-form-label'>Last Name</label>
                    <div>
                        <input 
                        id='lastName'
                        type="text"
                        className='form-control'
                        name='lastName'
                        value={registration.lastName}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="email" className='col-sm-2 col-form-label'>Email</label>
                    <div>
                        <input 
                        id='email'
                        type="email"
                        className='form-control'
                        name='email'
                        value={registration.email}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="password" className='col-sm-2 col-form-label'>Password</label>
                    <div>
                        <input 
                        id='password'
                        type="password"
                        className='form-control'
                        name='password'
                        value={registration.password}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                </div>

                <div className='mb-3'>
                    <button className='btn btn-hotel' style={{marginRight: "10px"}}>Register</button>
                    <span style={{marginLeft: "10px"}}>Already have an account?
                    <Link to ={"/login"}>Login</Link>
                    </span>                  
                </div>
            </form>
        </section>
    );
};

export default Registration;

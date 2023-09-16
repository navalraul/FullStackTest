import React, { createContext, useEffect, useState } from 'react';
import { AuthContexts } from './Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from './ApiConfig';


const Login = () => {

    const [userData, setUserData] = useState({email: "", password: ""});
    const router = useNavigate();
    const {state, Login} = createContext(AuthContexts); 

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(userData.email && userData.password){
            try{
                const response = await api.post("/login", {userData})

                if(response.data.success) {
                    Login(response.data)
                    setUserData({email: "", password: ""})
                    toast.success(response.data.message)
                    router('/')
                } else{
                    toast.error(response.data.message)
                }
            } catch(error) {
                toast.error(error.response.data.message)
            }
        }else {
            toast.error("All fields are mandatory")
        }
    }

    useEffect(()=> {
        if(state?.currentUser?.name) {
            'router'('/')
        }
    },[state])


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label><br />
                <input type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <label>Password:</label><br />
                <input type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <input type='submit' value='Login' />
            </form>
            <button onClick={() => router('/register')}>Register</button>
        </div>
    )
}

export default Login;

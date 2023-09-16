
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import api from './ApiConfig/index';
import { AuthContexts } from './Context/AuthContext';


const Register = () => {

    const [userData, setUserData] = useState({name: "", email: "", password: "", confirmpassword:"", role: "User"})    
    const router = useNavigate();

    const {state} = createContext(AuthContexts);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if(userData.name && userData.email && userData.password && userData.confirmpassword && userData.role){
            if(userData.password === userData.confirmpassword) {
                try{
                    const response = await api.post("/register", {userData})

                    if(response.data.success) {
                        setUserData({ name: "", email: "", password: "", confirmPassword: "", role: "User" })
                        toast.success(response.data.message)
                        router('/login')
                    } else {
                        toast.error(response.data.message)
                    }
                } catch(error){
                    toast.error(error.response.data.message)
                }
            } else {
                toast.error("Password and confrimpassword not matched")
            }
        } else {
            toast.error("All fields are mandatory")
        }
    }

    const handleChange = (event) => {
        setUserData({...userData,[event.target.name]: event.target.value})
    }

    const handleChangeSelect = (event) => {
        setUserData({...userData, "role": event.target.value})
    }

    useEffect(()=> {
        if(state?.currentUser?.name) {
            'router'('/')
        }
    },[state])

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input type='text' onChange={handleChange} name='name' value={userData.name}  /><br />
        <label>Email:</label><br />
        <input type='email' onChange={handleChange} name='email' value={userData.email} /><br />
        <select onChange={handleChangeSelect}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
        </select><br />
        <label>Password:</label><br />
        <input type='password' onChange={handleChange} name='password' value={userData.password} /><br />
        <label>ConfirmPassword:</label><br />
        <input type='password' onChange={handleChange} name='confirmpassword' value={userData.confirmpassword} /><br />
        <input type='submit' value='Register' />
      </form>
      <button onClick={() => router('/login')}>Login</button>
    </div>
  )
}

export default Register;

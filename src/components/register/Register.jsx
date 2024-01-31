import React, { useState } from 'react'
import "./style.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useLogInData } from '../../context/LoginData'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registerName, setRegisterName] = useState(false)
    const [registerPassword, setRegisterPassword] = useState(false)
    const naviagte = useNavigate()

    const logindata = useLogInData()


    const handelSubmit = (e) => {
        e.preventDefault()
        handleRegister(username, password)
    }

    const handleRegister = (username, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        if (existingUsers.some((user) => user.username === username) || password.length <= 4) {
            if (existingUsers.some((user) => user.username === username)) {
                setRegisterName(true)
            }
            else {
                setRegisterPassword(true)
            }
            return;
        }
        else if (existingUsers.some((user) => user.username.toLowerCase() === username || user.username === username.toLowerCase())) {
            setRegisterName(true)
        }
        else {
            const newUser = { username, password };
            const updatedUsers = [...existingUsers, newUser];
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            localStorage.setItem('user', JSON.stringify(newUser));
            logindata.setLoggedIn(true)
            logindata.setUser(newUser);
            naviagte('/')
        }

    }

    return (
        <div className='register-box'>
            <h2>Ragister</h2>
            <form onSubmit={handelSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                {
                    registerName ? <><p>Username is already taken. Please choose a different one.</p></> : <></>
                }
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
                {
                    registerPassword ? <><p>Password Must be more then 4 Char...</p></> : <></>
                }
                <input type="submit" />
            </form>
            <Link to="/login" className='link'>Login</Link>
        </div>
    )
}

export default Register
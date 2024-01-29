import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./style.scss"
import { LoginContext } from '../../context/LoginData'

const Login = () => {

    const logindata = useContext(LoginContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const naviagte = useNavigate()

    const handelSubmit = (e) => {
        e.preventDefault()
        handleLogin(username, password)
    }

    const handleLogin = (username, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const loggedInUser = existingUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (loggedInUser) {
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            logindata.setLoggedIn(true);
            logindata.setUser(loggedInUser);
            navigate('/home')
        } else {
            alert('Invalid username or password.');
        }
    }

    return (
        <div className='register-box'>
            <h2>Login</h2>
            <form onSubmit={handelSubmit}>
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" />
            </form>
            <Link to="/register" className='link'>Register</Link>
        </div>
    )
}

export default Login
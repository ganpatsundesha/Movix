import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./style.scss"

const Login = ({ handleLogin, loggedIn }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const naviagte = useNavigate()

    const handelSubmit = (e) => {
        e.preventDefault()
        handleLogin(username, password)
        console.log(loggedIn);
        if (handleLogin) {
            naviagte('/')
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
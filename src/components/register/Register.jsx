import React, { useState } from 'react'
import "./style.scss"
import { Link, useNavigate } from 'react-router-dom'

const Register = ({ handleRegister, setLoggedIn, loggedIn }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const naviagte = useNavigate()

    const handelSubmit = (e) => {
        e.preventDefault()
        handleRegister(username, password)
        if (loggedIn) {
            naviagte('/')
            setLoggedIn(true)
            console.log(loggedIn);
        }
    }

    return (
        <div className='register-box'>
            <h2>Ragister</h2>
            <form onSubmit={handelSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
                <input type="submit" />
            </form>
            <Link to="/login" className='link'>Login</Link>
        </div>
    )
}

export default Register
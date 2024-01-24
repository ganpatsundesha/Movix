import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Details from "./pages/details/Details"
import SearchResults from "./pages/searchResults/SearchResults"
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/404/PageNotFound"
import Register from './components/register/Register'
import Login from './components/Login/Login'

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const curUser = JSON.parse(localStorage.getItem('user'))
        if (curUser) {
            setLoggedIn(true)
            setUser(curUser);
        }
    }, [])

    const handleRegister = (username, password) => {
        // get existingUsers from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        if (existingUsers.some((user) => user.username === username)) {
            alert('Username is already taken. Please choose a different one.');
            return;
        }

        const newUser = { username, password };
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        localStorage.setItem('user', JSON.stringify(newUser));
        setLoggedIn(true);
        setUser(newUser);
        return loggedIn
    }

    const handleLogin = (username, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const loggedInUser = existingUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (loggedInUser) {
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            setLoggedIn(true);
            setUser(loggedInUser);
        } else {
            alert('Invalid username or password.');
        }
    }

    const dispatch = useDispatch()
    const url = useSelector((data) => {
        data.home
    })
    useEffect(() => {
        apiTesting()
        genresCall()
    })

    const apiTesting = () => {
        fetchDataFromApi("/configuration")
            .then((res) => {
                const url = {
                    backdrop: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                }
                dispatch(getApiConfiguration(url))
            })
    }

    const genresCall = async () => {
        let promises = []
        let endPoints = ['tv', 'movie']
        let allGenres = {}
        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`))
        })

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => {
                allGenres[item.id] = item
            })
        })

        dispatch(getGenres(allGenres))
    }

    return (
        <BrowserRouter>
            <Routes >
                <Route path='/register' element={<Register setLoggedIn={setLoggedIn} loggedIn={loggedIn} handleRegister={handleRegister} />} />
                <Route path='/login' element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />} />
            </Routes>
            {
                loggedIn ? <>
                    <Header setLoggedIn={setLoggedIn} />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/:mediaType/:id' element={<Details />} />
                        <Route path='/search/:query' element={<SearchResults />} />
                        <Route path='/explore/:mediaType' element={<Explore />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                    <Footer /></> : <></>
            }

        </BrowserRouter>
    )
}

export default App
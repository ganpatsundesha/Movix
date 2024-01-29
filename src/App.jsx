import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { LoginContext } from './context/LoginData'
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

    // login/ragister Functionality Start

    const { loggedIn, setLoggedIn, user, setUser } = useContext(LoginContext)

    useEffect(() => {
        const curUser = JSON.parse(localStorage.getItem('user'))
        console.log(curUser);
        if (curUser) {
            setLoggedIn(true)
            setUser(curUser);
        }
    }, [])


    // login/ragister Functionality end

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
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Login />} />
            </Routes>
            {
                loggedIn ? <>
                    <Header />
                    <Routes>
                        <Route path='/home' element={<Home />} />
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
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { LoginProvider } from './context/LoginData.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <LoginProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </LoginProvider>
        </BrowserRouter>
    </React.StrictMode>,
)

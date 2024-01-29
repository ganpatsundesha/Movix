import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { LoginProvider } from './context/LoginData.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LoginProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </LoginProvider>
    </React.StrictMode>,
)

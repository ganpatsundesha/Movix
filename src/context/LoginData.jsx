import { createContext, useState } from "react";

export const LoginContext = createContext(null)

export const LoginProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
            {
                props.children
            }
        </LoginContext.Provider>
    )
}
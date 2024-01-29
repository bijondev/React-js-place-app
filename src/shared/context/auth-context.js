import { createContext } from "react";


export const authContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => { },
    logout: () => { }
})

import AdminApi from "@/services/Api/Admin/AdminApi";
import { createContext, useState, useContext } from "react";


export const UserstateContext = createContext({
    user: {},
    setUser: () => { },
    logout: () => { },
    authenticated: false,
    login: (email, password) => { },
    setAuthenticated: () => { }
});

export default function AuthContext({ children }) {
    const [user, setUser] = useState({});
    const [authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'));

    const login = async (email, password) => {
        await AdminApi.getCsrfToken()
        return AdminApi.login(email, password)
    }
    const logout = () => {
        setUser({});
        setAuthenticated(false)
        // window.localStorage.removeItem("AUTHENTICATED");
    };

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
    }
    return (
        <UserstateContext.Provider value={{
            user,
            login,
            logout,
            authenticated,
            setAuthenticated,
            setUser
        }}>
            {children}
        </UserstateContext.Provider>
    );
}

// Custom hook to use the UserstateContext
export const useUserContext = () => useContext(UserstateContext);

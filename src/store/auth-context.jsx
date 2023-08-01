import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    isLogin: false,
    login: ()=>{},
    logout: (email, password)=>{},
});

export const AuthContextProvider = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    
    useEffect(()=>{
        let localStorageTemp = localStorage.getItem('isLogin');

        if(localStorageTemp === 1) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    },[])

    const login =() => {
        localStorage.setItem('isLogin', 1);
        setIsLogin(true);
    }

    const logout = () => {
        localStorage.removeItem('isLogin');
        setIsLogin(false);
    }

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;




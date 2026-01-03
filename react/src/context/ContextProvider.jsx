import { createContext, useContext, useState } from "react"


export const stateContext = createContext({
    currentuser:{},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {},
})

export const ContextProvider = ({ children }) => { 
    const [currentuser, setCurrentUser] = useState({});
    const [userToken, setUserToken] = useState(null);

    console.log(userToken)

    function userTokenSetter(token){
        if(token){
            localStorage.setItem('token',token)
        }else{
            localStorage.removeItem('token');
        }
        setUserToken(token);
    }

    return (
        <stateContext.Provider value={{ currentuser, setCurrentUser, userToken, userTokenSetter }}>
            {children}
        </stateContext.Provider>
    )
}


export const useStateContext = () => useContext(stateContext);
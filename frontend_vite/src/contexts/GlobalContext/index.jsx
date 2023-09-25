import React, { createContext, useContext, useState } from "react"

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [chainId, setChainId] = useState(170);
    
    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <GlobalContext.Provider value={{ refreshPage, chainId }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobal = () => {
    const globalManager = useContext(GlobalContext);
    return globalManager || [{}];
}

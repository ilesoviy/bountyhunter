import React, { createContext, useCallback, useContext, useEffect, useState } from "react"

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [chainId, setChainId] = useState(170);

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <React.StrictMode>
            <GlobalContext.Provider value={{ refreshPage, chainId }}>
                {children}
            </GlobalContext.Provider>
        </React.StrictMode>
    )
}

export const useGlobal = () => {
    const globalManager = useContext(GlobalContext)
    return globalManager || [{}]
}

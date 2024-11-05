/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const ctxValue = {
        state: isOpen,
        setState: () => setIsOpen((state) => !state),
        isLogged,
        setLogged: () => setIsLogged((state) => !state),
    }
    return (
        <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>
    )
}

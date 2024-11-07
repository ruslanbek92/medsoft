/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLogged, setIsLogged] = useState(
        !!JSON.parse(localStorage.getItem('currentUser'))
    )
    const ctxValue = {
        state: isOpen,
        setState: () => setIsOpen((state) => !state),
        isLogged,
        logToggle: () => setIsLogged((state) => !state),
    }
    return (
        <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>
    )
}

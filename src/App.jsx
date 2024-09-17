import React from 'react'
import './App.css'
import Header from './components/header'
import Sidebar from './components/sidebar'
import Registration from './components/registration'

function App() {
    return (
        <>
            <Header />
            <main style={{ display: 'flex' }}>
                <Sidebar />
                <Registration />
            </main>
        </>
    )
}

export default App

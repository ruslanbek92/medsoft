import React from 'react'

import Header from './components/header'
import SignIn from './components/signIn'
// import Sidebar from './components/sidebar'
// import Registration from './components/registration'

function App() {
    return (
        <>
            <Header />
            <main style={{ display: 'flex' }}>
                <SignIn />
                {/* <Sidebar />
                <Registration /> */}
            </main>
        </>
    )
}

export default App

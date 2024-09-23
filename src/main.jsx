import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import SignIn from './components/signIn'
import MainContent from './components/mainContent'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { path: '/', element: <SignIn /> },
            { path: 'main', element: <MainContent /> },
        ],
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)

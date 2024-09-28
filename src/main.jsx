import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import SignIn from './components/signIn'
import MainContent from './routes/mainContent'
import Registration from './components/registration/registration'
import Investigations from './components/investigations'
import Reports from './components/reports'
import Payment from './components/payment'
import Doctors from './components/doctors'
import Personnel from './components/personnel'
import Patients from './components/patients/patients'
import PatientDetails from './components/patients/patientDetails'
import Queue, { loader as queueLoader } from './components/queues/queue'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { path: '/', element: <SignIn /> },
            {
                path: 'main',
                element: <MainContent />,
                children: [
                    {
                        path: 'registration',
                        element: <Registration />,
                    },
                    {
                        path: 'investigations',
                        element: <Investigations />,
                    },
                    {
                        path: 'reports',
                        element: <Reports />,
                    },
                    {
                        path: 'payments',
                        element: <Payment />,
                    },
                    {
                        path: 'doctors',
                        element: <Doctors />,
                    },
                    {
                        path: 'personnel',
                        element: <Personnel />,
                    },
                    {
                        path: 'patients',
                        element: <Patients />,
                    },
                    {
                        path: 'patients/:id',
                        element: <PatientDetails />,
                    },
                    {
                        path: 'queue',
                        element: <Queue />,
                        loader: queueLoader,
                    },
                ],
            },
        ],
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)

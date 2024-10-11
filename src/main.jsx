import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import SignIn from './components/signIn'
import MainContent from './routes/mainContent'
import Registration, {
    loader as registrationLoader,
    action as registrationAction,
} from './pages/registration'
import Investigations, {
    loader as investigationsLoader,
} from './pages/investigations'
import Reports, { loader as reportsLoader } from './pages/reports'
import Payment, { loader as paymentsLoader } from './pages/payment'
import Doctors, { loader as doctorsLoader } from './pages/doctors'
import Personnel, { loader as personnelLoader } from './pages/personnel'
import Patients, {
    loader as patientsLoader,
    action as patientsAction,
} from './pages/patients'
import PatientDetails, {
    loader as patientDetailsLoader,
} from './components/patients/patientDetails'
import Queue, { loader as queueLoader } from './pages/queue'
import Error from './pages/error'

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
                        loader: registrationLoader,
                        action: registrationAction,
                    },
                    {
                        path: 'investigations',
                        element: <Investigations />,
                        loader: investigationsLoader,
                    },
                    {
                        path: 'reports',
                        element: <Reports />,
                        loader: reportsLoader,
                    },
                    {
                        path: 'payments',
                        element: <Payment />,
                        loader: paymentsLoader,
                    },
                    {
                        path: 'doctors',
                        element: <Doctors />,
                        loader: doctorsLoader,
                    },
                    {
                        path: 'personnel',
                        element: <Personnel />,
                        loader: personnelLoader,
                    },
                    {
                        path: 'patients',
                        element: <Patients />,
                        loader: patientsLoader,
                        action: patientsAction,
                    },
                    {
                        path: 'patients/:id',
                        element: <PatientDetails />,
                        loader: patientDetailsLoader,
                    },
                    {
                        path: 'queue',
                        element: <Queue />,
                        loader: queueLoader,
                    },
                ],
            },
        ],
        errorElement: <Error />,
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)

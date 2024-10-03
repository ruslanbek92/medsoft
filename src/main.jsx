import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import SignIn from './components/signIn'
import MainContent from './routes/mainContent'
import Registration, {
    loader as registrationLoader,
} from './components/registration/registration'
import Investigations, {
    loader as investigationsLoader,
} from './components/investigations'
import Reports, { loader as reportsLoader } from './components/reports'
import Payment, {
    loader as paymentsLoader,
} from './components/payments/payment'
import Doctors, { loader as doctorsLoader } from './components/doctors'
import Personnel, { loader as personnelLoader } from './components/personnel'
import Patients, {
    loader as patientsLoader,
} from './components/patients/patients'
import PatientDetails, {
    loader as patientDetailsLoader,
} from './components/patients/patientDetails'
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
                        loader: registrationLoader,
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
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)

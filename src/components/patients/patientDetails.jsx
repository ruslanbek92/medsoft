import React, { useEffect, useRef, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'

import { useLoaderData } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import PatientAssign from './patientAssign'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseconfig'
import { ModalComponent } from '../modalComponent'
import { CashierForm } from '../payments/cashierForm'
const cashierID = import.meta.env.VITE_CASHIER_ID

function PatientDetails() {
    const documentSnapshot = useLoaderData()
    const patient = documentSnapshot.data()
    const [isCashierLogged, setIsCashierLogged] = useState(false)
    const dialogRef = useRef()
    console.log('patient', patient)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user.uid === cashierID) {
                setIsCashierLogged(true)
            } else setIsCashierLogged(false)
        })
    }, [])
    function handleOpenModal() {
        dialogRef.current.open()
    }
    return (
        <>
            <div className="pt-detail">
                <p>Bemor ismi: {patient['pt-name']}</p>
                <p>Bemor Familyasi: {patient['pt-surname']}</p>
                <p>Royxatdan otgan sanasi: {patient.dor}</p>
                <p>Tugilgan sanasi: {patient['pt-dob']}</p>
                <p>Qabul turi: {patient['pt-type']}</p>
                <p>Bemor identifikatsion raqami: {patient['pt-passport']}</p>
                <p>Bemor manzili: {patient['pt-address']}</p>
                <PatientAssign patientId={documentSnapshot.id} />
                {isCashierLogged && (
                    <>
                        <div className="pt-detail">
                            <button onClick={handleOpenModal}>
                                To&apos;lov qilish
                            </button>
                            <p>Qarzdorlik:{patient.debtAmount}</p>
                        </div>
                        <ModalComponent ref={dialogRef}>
                            <CashierForm
                                onModalClose={() => dialogRef.current.close()}
                            />
                        </ModalComponent>
                    </>
                )}
            </div>
        </>
    )
}

export async function loader({ params }) {
    return getDoc(doc(db, 'patients', params.id))
}

export default PatientDetails

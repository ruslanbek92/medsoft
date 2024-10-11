import React, { useEffect, useRef, useState } from 'react'
import Modal from '../modal'
import { getPaymentsById } from '../../firestore/firestore'

/* eslint-disable-next-line */
const PatientAssign = ({ patientId }) => {
    const [loading, setLoading] = useState(false)
    const [payments, setPayments] = useState([])
    const modalRef = useRef(null)

    async function getPatientPayments(id) {
        setLoading(true)
        const querySnapshot = await getPaymentsById(id)
        setPayments(querySnapshot.docs.map((item) => item.data()))
        setLoading(false)
    }

    const handlePaymentsChange = () => {
        getPatientPayments(patientId)
    }
    useEffect(() => {
        getPatientPayments(patientId)
    }, [patientId])

    function handleAddPayment() {
        modalRef.current.open()
    }
    return (
        <div className="pt-assign">
            {loading && 'Loading...'}
            {!loading && (
                <>
                    <h3>To&apos;lovlar</h3>
                    <ul>
                        {/* eslint-disable-next-line */}
                        {payments.map((el) => (
                            <li
                                className="payment-item"
                                key={el.date}
                            >{`Xizmat: ${el.service}  summa: ${el.sum}  status: ${el.status}  sana: ${el.date}`}</li>
                        ))}
                    </ul>
                    <button type="button" onClick={handleAddPayment}>
                        Qo&apos;shish
                    </button>
                </>
            )}
            <Modal
                patientId={patientId}
                onPaymentsChange={handlePaymentsChange}
                ref={modalRef}
            />
        </div>
    )
}

export default PatientAssign

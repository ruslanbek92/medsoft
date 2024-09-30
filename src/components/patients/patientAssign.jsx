import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebaseconfig'
import Modal from '../modal'

/* eslint-disable-next-line */
const PatientAssign = ({ patientId }) => {
    const [loading, setLoading] = useState(false)
    const [payments, setPayments] = useState([])
    const modalRef = useRef(null)
    useEffect(() => {
        async function getPayments(id) {
            setLoading(true)
            const collectionRef = collection(db, 'payments')
            const q = query(collectionRef, where('patientId', '==', id))
            const querySnapshot = await getDocs(q)
            setPayments(querySnapshot.docs.map((item) => item.data()))
            setLoading(false)
        }
        getPayments(patientId)
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
                        {payments.map((el, index) => (
                            <li
                                className="payment-item"
                                key={index}
                            >{`Xizmat: ${el.service}  summa: ${el.sum}  status: ${el.status}  sana: ${el.date}`}</li>
                        ))}
                    </ul>
                    <button type="button" onClick={handleAddPayment}>
                        Qo&apos;shish
                    </button>
                </>
            )}
            <Modal patientId={patientId} ref={modalRef} />
        </div>
    )
}

export default PatientAssign
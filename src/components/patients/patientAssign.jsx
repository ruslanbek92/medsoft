import React, { useEffect, useRef, useState } from 'react'
import { deletePayment, getPaymentsById } from '../../firestore/firestore'
import { useNavigate } from 'react-router-dom'
import { ModalComponent } from '../modalComponent'
import { PaymentForm } from '../payments/paymentForm'
import Cheque from '../payments/cheque'

/* eslint-disable-next-line */
const PatientAssign = ({ patientId }) => {
    const [loading, setLoading] = useState(false)
    const [payments, setPayments] = useState([])
    const [currentPayment, setCurrentPayment] = useState(null)
    const modalRef = useRef(null)
    const chequeModalRef = useRef(null)
    const navigate = useNavigate()
    console.log('curr payment', currentPayment)
    async function getPatientPayments(id) {
        setLoading(true)
        const payments = await getPaymentsById(id)
        setPayments(payments)
        setLoading(false)
    }
    async function handlePaymentDelete(patientId, paymentId) {
        setLoading(true)
        await deletePayment(patientId, paymentId)
        navigate(`/main/patients/${patientId}`)
    }
    useEffect(() => {
        getPatientPayments(patientId)
    }, [patientId])

    function handleAddPayment() {
        modalRef.current.open()
    }
    function handlePrintCheque(payment) {
        setCurrentPayment(payment)
        chequeModalRef.current.open()
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
                                className={`payment-item ${el.status === 'unpaid' ? 'unpaid' : ''}`}
                                key={el.id}
                            >
                                {
                                    <>
                                        <p>{`Xizmat: ${el.name} `}</p>
                                        <p>{`summa: ${el.summ} `}</p>
                                        <p>{`status: ${el.status}`}</p>
                                        <p>{`sana: ${el.date}`}</p>
                                    </>
                                }
                                {el.status === 'paid' && (
                                    <button
                                        onClick={() => handlePrintCheque(el)}
                                    >
                                        Chek chiqarish
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        handlePaymentDelete(patientId, el.id)
                                    }
                                >
                                    o&apos;chirish
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={handleAddPayment}>
                        Qo&apos;shish
                    </button>
                </>
            )}
            <ModalComponent ref={chequeModalRef}>
                <Cheque
                    payment={currentPayment}
                    onModalClose={() => chequeModalRef.current.close()}
                />
            </ModalComponent>
            <ModalComponent ref={modalRef}>
                <PaymentForm
                    patientId={patientId}
                    onModalClose={() => modalRef.current.close()}
                />
            </ModalComponent>
        </div>
    )
}

export default PatientAssign

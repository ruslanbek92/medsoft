import React, { useRef, useState } from 'react'
import { deletePayment, getPaymentsById } from '../../firestore/firestore'
import { ModalComponent } from '../modalComponent'
import { PaymentForm } from '../payments/paymentForm'
import Cheque from '../payments/cheque'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../main'

/* eslint-disable-next-line */
const PatientAssign = ({ patientId }) => {
    const [currentPayment, setCurrentPayment] = useState(null)
    const modalRef = useRef(null)
    const chequeModalRef = useRef(null)
    // console.log('curr payment', currentPayment)

    const { data, isPending, refetch } = useQuery({
        queryKey: ['payments', patientId],
        queryFn: () => getPatientPayments(patientId),
    })
    const { mutate, isPending: isMutationPending } = useMutation({
        queryKey: ['payments', patientId],
        mutationFn: async ({ patientId, paymentId }) => {
            await deletePayment(patientId, paymentId)
        },
        onSuccess: () => {
            alert("muvaffaqiyatli o'chirildi!")
            queryClient.invalidateQueries(
                { queryKey: ['payments', patientId] },
                { refetchType: 'all' }
            )
        },
    })

    async function getPatientPayments(id) {
        const payments = await getPaymentsById(id)
        return payments
    }
    async function handlePaymentDelete(patientId, paymentId) {
        mutate({ patientId, paymentId })
    }

    function handleAddPayment() {
        modalRef.current.open()
    }

    function handlePrintCheque(payment) {
        setCurrentPayment(payment)
        chequeModalRef.current.open()
    }
    return (
        <div className="pt-assign">
            {isPending && 'Yuklanmoqda...'}
            {isMutationPending && "O'chirilmoqda..."}
            {!isPending && !isMutationPending && (
                <>
                    <h3>To&apos;lovlar</h3>
                    <ul>
                        {/* eslint-disable-next-line */}
                        {data.map((el) => (
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
                    refetchFn={refetch}
                    patientId={patientId}
                    onModalClose={() => modalRef.current.close()}
                />
            </ModalComponent>
        </div>
    )
}

export default PatientAssign

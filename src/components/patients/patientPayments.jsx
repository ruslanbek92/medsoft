/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { deletePayment, getPaymentsById } from '../../firestore/firestore'
import { ModalComponent } from '../modalComponent'
import { PaymentForm } from '../payments/paymentForm'
import Cheque from '../payments/cheque'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../main'
import { CashierForm } from '../../components/payments/cashierForm'
/* eslint-disable-next-line */
const PatientPayments = ({ user, patient }) => {
    const [currentPayment, setCurrentPayment] = useState(null)
    const [modalMode, setModalMode] = useState('')
    const dialogRef = useRef()

    const { data, isPending, refetch } = useQuery({
        queryKey: ['payments', patient.id],
        queryFn: () => getPatientPayments(patient.id),
    })
    const { mutate, isPending: isMutationPending } = useMutation({
        queryKey: ['payments', patient.id],
        mutationFn: async ({ patientId, paymentId }) => {
            await deletePayment(patientId, paymentId)
        },
        onSuccess: () => {
            alert("muvaffaqiyatli o'chirildi!")
            queryClient.invalidateQueries(
                { queryKey: ['payments', patient.id] },
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
        setModalMode('paymentForm')
        dialogRef.current.open()
    }

    function handlePrintCheque(payment) {
        setModalMode('cheque')
        setCurrentPayment(payment)
        dialogRef.current.open()
    }

    function handleMakePayment() {
        setModalMode('cashierForm')
        dialogRef.current.open()
    }
    return (
        <div className="">
            <div className="p-4">
                {isPending && 'Yuklanmoqda...'}
                {isMutationPending && "O'chirilmoqda..."}
                {!isPending && !isMutationPending && (
                    <>
                        <h3 className="font-bold mb-3 text-lg">
                            To&apos;lovlar
                        </h3>
                        <div className="my-3 flex justify-between items-center">
                            {user.role === 'cashier' && (
                                <div className="p-3 border rounded-md bg-gray-50">
                                    <p className="text-slate-600 font-semibold">
                                        Qarzdorlik
                                    </p>
                                    <p
                                        className={`font-bold text-3xl ${patient.debtAmount > 0 ? 'text-red-600' : 'text-lime-600'}`}
                                    >
                                        {patient.debtAmount} so&apos;m
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-2">
                                {user.role === 'cashier' && (
                                    <button
                                        className="my-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={handleMakePayment}
                                    >
                                        To&apos;lov qilish
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleAddPayment}
                                    className="my-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    To&apos;lov qo&apos;shish
                                </button>
                            </div>
                        </div>
                        <table className="table-auto w-full text-left">
                            <thead className="bg-gray-50">
                                <th className="px-6 py-3" scope="col">
                                    Xizmat
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Summa
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Maqomi
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Sana
                                </th>
                                <th className="px-6 py-3" scope="col"></th>
                                <th className="px-6 py-3" scope="col"></th>
                            </thead>
                            {/* eslint-disable-next-line */}
                            <tbody>
                                {data.map((el) => (
                                    <tr
                                        className="p-3 mb-2 border-b"
                                        key={el.id}
                                    >
                                        {
                                            <>
                                                <th
                                                    className="px-6 py-3"
                                                    scope="row"
                                                >{`${el.name} `}</th>
                                                <td className="px-6 py-3">{`${el.summ} `}</td>
                                                <td
                                                    className={`px-6 py-3 font-semibold ${el.status === 'unpaid' ? 'text-red-800' : 'text-lime-600'}`}
                                                >{`${el.status === 'paid' ? "to'langan" : "to'lanmagan"}`}</td>
                                                <td className="px-6 py-3">{`${el.date}`}</td>
                                            </>
                                        }
                                        <td>
                                            <button
                                                className="my-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                onClick={() =>
                                                    handlePaymentDelete(
                                                        patient.id,
                                                        el.id
                                                    )
                                                }
                                            >
                                                o&apos;chirish
                                            </button>
                                        </td>
                                        {el.status === 'paid' && (
                                            <td>
                                                <button
                                                    className="my-4 flex justify-center rounded-md bg-lime-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    onClick={() =>
                                                        handlePrintCheque(el)
                                                    }
                                                >
                                                    Chek chiqarish
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
            <ModalComponent ref={dialogRef}>
                {modalMode === 'cashierForm' && (
                    <CashierForm
                        onModalClose={() => dialogRef.current.close()}
                    />
                )}
                {modalMode === 'paymentForm' && (
                    <PaymentForm
                        refetchFn={refetch}
                        patientId={patient.id}
                        onModalClose={() => dialogRef.current.close()}
                    />
                )}
                {modalMode === 'cheque' && (
                    <Cheque
                        payment={currentPayment}
                        onModalClose={() => dialogRef.current.close()}
                    />
                )}
            </ModalComponent>
        </div>
    )
}

export default PatientPayments

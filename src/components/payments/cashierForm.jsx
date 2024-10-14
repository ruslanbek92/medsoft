/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Input from '../input'
import { useParams } from 'react-router-dom'
import { getPaymentsById } from '../../firestore/firestore'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseconfig'
import { useFormSubmit } from '../../hooks/useModalFormSubmit'

export const CashierForm = ({ onModalClose }) => {
    const { id } = useParams()
    const [payments, setPayments] = useState([])
    const [currentPayment, setCurrentPayment] = useState(null)
    const { formLoading, handleSubmit } = useFormSubmit(
        handleSubmitLogic,
        onModalClose
    )

    useEffect(() => {
        async function fillPaymentSelects() {
            const payments = await getPaymentsById(id)
            setPayments(payments.filter((item) => item.status === 'unpaid'))
        }
        fillPaymentSelects()
    }, [])

    async function handleSubmitLogic(e) {
        let data = Object.fromEntries(new FormData(e.target))
        const paymentObj = {
            ...JSON.parse(data['payment-obj']),
            discount: JSON.parse(data['payment-obj']).discount
                ? JSON.parse(data['payment-obj']).discount
                : 0,
        }
        data = {
            ...data,
            'payment-obj': paymentObj,
            discount: paymentObj.discount,
        }
        const docRef = doc(
            db,
            'patients',
            id,
            'payments',
            data['payment-obj'].id
        )
        await updateDoc(docRef, {
            status: 'paid',
            'payment-details': {
                date: new Date(),
                type: data['payment-type'],
                discount: data.discount,
            },
        })
    }

    return (
        <>
            {!formLoading && (
                <form className="modal-form" onSubmit={handleSubmit}>
                    <h3>To&apos;lov qilish</h3>
                    {currentPayment && (
                        <p>to&apos;lov summasi:{currentPayment.summ}</p>
                    )}
                    <label htmlFor="payment-select">to&apos;lov nomi</label>
                    <select
                        id="payment-select"
                        name="payment-obj"
                        onChange={(e) =>
                            setCurrentPayment(JSON.parse(e.target.value))
                        }
                        required
                    >
                        {payments &&
                            payments.map((item) => (
                                <option
                                    key={item.id}
                                    value={JSON.stringify(item)}
                                >
                                    {item.name}
                                </option>
                            ))}
                    </select>

                    <fieldset>
                        <legend>to&apos;lov turi</legend>
                        <label htmlFor="cash">Naqd</label>
                        <input
                            type="radio"
                            id="cash"
                            name="payment-type"
                            value="cash"
                            required
                        />
                        <label htmlFor="cash">Plastik</label>
                        <input
                            type="radio"
                            id="card"
                            name="payment-type"
                            value="card"
                            required
                        />
                    </fieldset>
                    <Input
                        type="number"
                        id="discount"
                        name="discount"
                        label="Chegirma summasi(agar bo'lsa)"
                    />
                    <button type="submit">to&apos;lash</button>
                </form>
            )}
            {formLoading && 'Yuborilmoqda...'}
            {!formLoading && (
                <form method="dialog">
                    <button>yopish</button>
                </form>
            )}
        </>
    )
}

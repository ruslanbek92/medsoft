/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Input from '../input'
import { useParams } from 'react-router-dom'
import { getPaymentsById } from '../../firestore/firestore'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseconfig'

import { useMutation, useQuery } from '@tanstack/react-query'

export const CashierForm = ({ onModalClose }) => {
    const { id } = useParams()
    const [currentPayment, setCurrentPayment] = useState(null)

    const { data, isPending } = useQuery({
        queryKey: ['payments', id],
        queryFn: ({ id }) => getPaymentsById(id),
    })
    const { mutate, isPending: isMutationPending } = useMutation({
        mutationFn: ({ docRef, newPayment }) => updateDoc(docRef, newPayment),
        onSuccess: () => {
            alert("to'landi!")
        },
    })
    let payments
    if (data) {
        payments = data.filter((item) => item.status === 'unpaid')
    }

    async function handleSubmit(e) {
        e.preventDefault()
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
        const newPayment = {
            status: 'paid',
            'payment-details': {
                date: new Date(),
                type: data['payment-type'],
                discount: data.discount,
            },
        }
        mutate({ docRef, newPayment })
        e.target.reset()
        onModalClose()
    }

    return (
        <>
            {!isPending && (
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
            {isMutationPending && "To'lanmoqda..."}
            {!isMutationPending && (
                <form method="dialog">
                    <button>yopish</button>
                </form>
            )}
        </>
    )
}

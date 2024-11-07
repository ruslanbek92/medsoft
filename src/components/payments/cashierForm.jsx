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
                <form className="rounded border p-2 " onSubmit={handleSubmit}>
                    {currentPayment && (
                        <div className="p-2  flex  border-b">
                            <p className="w-36  font-semibold text-gray-900">
                                To&apos;lov summasi:
                            </p>
                            <p className=" font-semibold  text-gray-900">
                                {currentPayment.summ}
                            </p>
                        </div>
                    )}
                    <div className="p-2 flex  border-b items-center">
                        <label
                            className="w-36 font-semibold text-gray-900"
                            htmlFor="payment-select"
                        >
                            To&apos;lov nomi
                        </label>
                        <select
                            id="payment-select"
                            name="payment-obj"
                            className="my-2 p-1  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            onChange={(e) =>
                                setCurrentPayment(JSON.parse(e.target.value))
                            }
                            required
                        >
                            <option value="">Tanlang</option>
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
                    </div>

                    <div className="flex border-b p-2">
                        <legend className="w-36 font-semibold py-2">
                            To&apos;lov turi
                        </legend>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="cash"
                                    name="payment-type"
                                    value="cash"
                                    required
                                />
                                <label className="ml-2" htmlFor="cash">
                                    Naqd
                                </label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="card"
                                    name="payment-type"
                                    value="card"
                                    required
                                />
                                <label className="ml-2" htmlFor="cash">
                                    Plastik
                                </label>
                            </div>
                        </div>
                    </div>
                    <Input
                        type="number"
                        id="discount"
                        name="discount"
                        label="Chegirma summasi(agar bo'lsa)"
                    />
                    <button
                        className=" mt-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        type="submit"
                    >
                        to&apos;lash
                    </button>
                </form>
            )}
            {isMutationPending && "To'lanmoqda..."}
            {!isMutationPending && (
                <form method="dialog">
                    <button className="mt-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        yopish
                    </button>
                </form>
            )}
        </>
    )
}

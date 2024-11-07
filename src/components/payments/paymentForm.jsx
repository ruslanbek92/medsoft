/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
    addPayment,
    getDoctorsOrInvestigations,
} from '../../firestore/firestore'

import { useMutation } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseconfig'

export const PaymentForm = ({ patientId, refetchFn, onModalClose }) => {
    const [firstSelectState, setFirstStateSelect] = useState(null)
    const [secondSelectState, setSecondSelectState] = useState(null)

    const { mutate, isPending } = useMutation({
        mutationFn: ({ payment, patientId }) => addPayment(payment, patientId),
        onSuccess: () => {
            alert("to'lov muvaffaqiyatli qo'shildi")
            refetchFn()
        },
    })
    async function handleSelectChange(e) {
        setFirstStateSelect(e.target.value)
        const result = await getDoctorsOrInvestigations(e.target.value)
        setSecondSelectState(result)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = JSON.parse(
            Object.fromEntries(new FormData(e.target).entries()).service
        )
        let serviceProvider
        let type
        if (firstSelectState === 'investigations') {
            type = 'investigation'
            const investigationsSnapshot = await getDocs(
                collection(db, 'investigations')
            )
            serviceProvider = investigationsSnapshot.docs
                .map((item) => item.data())
                .find((item) => item.name === data.name).type
        } else if (firstSelectState === 'doctors') {
            type = 'consultation'
            serviceProvider = data.name
        }
        const payment = {
            name: data.name,
            summ: data.price,
            status: 'unpaid',
            date: new Date(),
            type,
            serviceProvider,
            isProvided: false,
        }
        mutate({ payment, patientId })
        e.target.reset()
        onModalClose()
    }

    return (
        <>
            {isPending && "Qo'shilmoqda..."}
            {!isPending && (
                <form
                    method="post"
                    className="rounded border p-2 "
                    onSubmit={handleSubmit}
                >
                    <fieldset className="rounded p-2 mb-4">
                        <legend className="font-semibold">
                            Xizmat turini tanlang:
                        </legend>
                        <label htmlFor="service"></label>
                        <select
                            id="type"
                            className="rounded border px-1  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            onChange={handleSelectChange}
                            required
                        >
                            <option value="">tanlang</option>
                            <option value="doctors">
                                Shifokor Konsultatsiyasi
                            </option>
                            <option value="investigations">Tekshiruv</option>
                        </select>
                    </fieldset>

                    {firstSelectState && (
                        <fieldset className=" rounded p-2">
                            <legend className="font-semibold">
                                {firstSelectState === 'investigations'
                                    ? 'Tekshiruv'
                                    : 'Shifokor'}
                                ni tanlang
                            </legend>
                            <label htmlFor={firstSelectState}></label>
                            {!secondSelectState && <p>Loading...</p>}
                            {secondSelectState && (
                                <select
                                    className="rounded border px-1  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    name="service"
                                    id={firstSelectState}
                                    required
                                >
                                    <option value="">tanlang</option>
                                    {secondSelectState.map((item) => (
                                        <option
                                            key={item.name}
                                            name={item.name}
                                            value={JSON.stringify(item)}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </fieldset>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className=" mt-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            yuborish
                        </button>
                    </div>
                </form>
            )}
            {!isPending && (
                <form method="dialog">
                    <button
                        type="button"
                        className="mt-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onModalClose}
                    >
                        yopish
                    </button>
                </form>
            )}
        </>
    )
}

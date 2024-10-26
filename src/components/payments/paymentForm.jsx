/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
    addPayment,
    getDoctorsOrInvestigations,
} from '../../firestore/firestore'

import { useMutation } from '@tanstack/react-query'

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
        const payment = {
            name: data.name,
            summ: data.price,
            status: 'unpaid',
            date: new Date(),
            type:
                firstSelectState === 'investigations'
                    ? 'investigation'
                    : firstSelectState === 'doctors'
                      ? 'consultation'
                      : '',
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
                    className="modal-form"
                    onSubmit={handleSubmit}
                >
                    <fieldset>
                        <legend>Xizmat turi:</legend>
                        {/* eslint-disable-next-line */}
                        <label htmlFor="service"></label>
                        <select
                            id="type"
                            onChange={handleSelectChange}
                            required
                        >
                            <option value="doctors">
                                Shifokor Konsultatsiyasi
                            </option>
                            <option value="investigations">Tekshiruv</option>
                        </select>
                    </fieldset>

                    {firstSelectState && (
                        <fieldset>
                            <legend>{firstSelectState}</legend>
                            {/* eslint-disable-next-line */}
                            <label htmlFor={firstSelectState}></label>
                            {!secondSelectState && <p>Loading...</p>}
                            {secondSelectState && (
                                <select name="service" id={firstSelectState}>
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
                    <button type="submit">yuborish</button>
                </form>
            )}
            {!isPending && (
                <form method="dialog">
                    <button type="button" onClick={onModalClose}>
                        yopish
                    </button>
                </form>
            )}
        </>
    )
}

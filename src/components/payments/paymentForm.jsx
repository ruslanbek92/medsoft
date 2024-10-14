/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
    addPayment,
    getDoctorsOrInvestigations,
} from '../../firestore/firestore'
import { useFormSubmit } from '../../hooks/useModalFormSubmit'

export const PaymentForm = ({ patientId, onModalClose }) => {
    const [firstSelectState, setFirstStateSelect] = useState(null)
    const [secondSelectState, setSecondSelectState] = useState(null)
    const { formLoading, handleSubmit } = useFormSubmit(
        handleSubmitLogic,
        onModalClose
    )

    async function handleSelectChange(e) {
        setFirstStateSelect(e.target.value)
        const result = await getDoctorsOrInvestigations(e.target.value)
        setSecondSelectState(result)
    }

    async function handleSubmitLogic(e) {
        const data = JSON.parse(
            Object.fromEntries(new FormData(e.target).entries()).service
        )
        await addPayment(
            {
                name: data.name,
                summ: data.cost,
                status: 'unpaid',
                date: new Date(),
            },
            patientId
        )
    }
    return (
        <>
            {formLoading && 'Yuklanmoqda...'}
            {!formLoading && (
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
            {!formLoading && (
                <form method="dialog">
                    <button type="button" onClick={onModalClose}>
                        yopish
                    </button>
                </form>
            )}
        </>
    )
}

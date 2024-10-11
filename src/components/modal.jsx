import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { addPayment, getDoctorsOrInvestigations } from '../firestore/firestore'

// eslint-disable-next-line
const Modal = forwardRef(function Modal({ patientId, onPaymentsChange }, ref) {
    const [firstSelectState, setFirstStateSelect] = useState(null)
    const [secondSelectState, setSecondSelectState] = useState(null)
    const [formLoading, setformLoading] = useState(false)
    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            },
        }
    }, [])

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
        setformLoading(true)
        await addPayment({
            service: data.name,
            sum: data.cost,
            patientId,
            status: 'unpaid',
            date: new Date(),
        })
        e.target.reset()
        setformLoading(false)
        dialog.current.close()
        onPaymentsChange()
    }
    function handleModalClose() {
        dialog.current.close()
    }
    return createPortal(
        <dialog ref={dialog}>
            {formLoading && 'Loading'}
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
                    <button type="button" onClick={handleModalClose}>
                        close
                    </button>
                </form>
            )}
        </dialog>,
        document.getElementById('modal')
    )
})

export default Modal

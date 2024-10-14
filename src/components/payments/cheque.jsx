/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const Cheque = ({ payment, onModalClose }) => {
    const contentRef = useRef(null)
    const handlePrint = useReactToPrint({
        contentRef,
    })

    return (
        payment && (
            <>
                <div ref={contentRef}>
                    <h3>Chek</h3>
                    <p>Nomi: {payment.name}</p>
                    <p>Id: {payment.id}</p>
                    <p>
                        to&apos;lov yaratilgan sana : {payment.date.toString()}
                    </p>
                    <p>
                        to&apos;lov qilingan sana :{' '}
                        {payment['payment-details'].date.toString()}
                    </p>
                    <p>summa: {payment.summ}</p>
                    <p>chegirma: {payment['payment-details'].discount}</p>
                    <p>
                        yakuniy to&apos;lov:{' '}
                        {payment.summ - payment['payment-details'].discount}
                    </p>
                    <p>to&apos;lov turi: {payment['payment-details'].type} </p>
                </div>
                <button onClick={handlePrint}>chop etish</button>
                <button onClick={onModalClose}>yopish</button>
            </>
        )
    )
}

export default Cheque

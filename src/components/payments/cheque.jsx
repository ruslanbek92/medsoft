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
                    <h3 className="font-bold mb-2">Chek</h3>
                    <div className="border rounded px-2">
                        <div className="flex border-b py-2">
                            <p className="font-semibold w-36">Xizmat nomi:</p>
                            <p className="font-semibold text-slate-600">
                                {payment.name}
                            </p>
                        </div>
                        <div className="flex border-b py-2">
                            <p className="font-semibold w-36">
                                To&apos;lov Idsi:
                            </p>
                            <p className="font-semibold text-slate-600">
                                {payment.id}
                            </p>
                        </div>

                        <div className="flex border-b py-2">
                            <p className="font-semibold w-36">
                                to&apos;lov qilingan sana :
                            </p>
                            <p className="font-semibold text-slate-600">
                                {payment['payment-details'].date.toString()}
                                {payment['payment-details'].date.toString()}
                            </p>
                        </div>
                        <div className="flex border-b py-2">
                            <p className="font-semibold w-36">summa:</p>
                            <p className="font-semibold text-slate-600">
                                {payment.summ} so&apos;m
                            </p>
                        </div>
                        <div className="flex border-b py-2">
                            <p className="font-semibold w-36">chegirma:</p>
                            <p className="font-semibold text-slate-600">
                                {payment['payment-details'].discount}
                            </p>
                        </div>
                        <div className="flex border-b py-2">
                            <p className="font-semibold w-36">
                                to&apos;lov turi:
                            </p>
                            <p className="font-semibold text-slate-600">
                                {payment['payment-details'].type === 'cash'
                                    ? 'naqd'
                                    : 'plastik'}
                            </p>
                        </div>
                        <div className="flex border-b py-2">
                            <p className="font-semibold w-36">
                                yakuniy to&apos;lov:
                            </p>
                            <p className="font-semibold text-slate-600">
                                {payment.summ -
                                    payment['payment-details'].discount}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="my-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handlePrint}
                    >
                        chop etish
                    </button>
                </div>
                <button
                    className="mt-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onModalClose}
                >
                    yopish
                </button>
            </>
        )
    )
}

export default Cheque

/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export const HistoryView = ({ type, consultation, onModalClose }) => {
    console.log('history', consultation.report.indicators)
    const contentRef = useRef(null)
    const handlePrint = useReactToPrint({
        contentRef,
    })
    let content
    if (type === 'doctor') {
        content = (
            <>
                <div className="border rounded px-2" ref={contentRef}>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Vaqti: </p>
                        <p className="font-semibold text-slate-600">
                            {new Date(consultation.date).toDateString()}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Shikoyatlar:</p>
                        <p className="font-semibold text-slate-600">
                            {consultation.complaints}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Tashxis:</p>
                        <p className="font-semibold text-slate-600">
                            {consultation.diagnosis}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Doktor:</p>
                        <p className="font-semibold text-slate-600">
                            {consultation.doctor}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">
                            Tavsiya qilingan tekshiruvlar:
                        </p>
                        <ul className="font-semibold text-slate-600">
                            {consultation.investigations.map((item) => (
                                <li key={Date.now()}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">
                            Tavsiya qilingan dorilar:
                        </p>
                        <ul className="font-semibold text-slate-600">
                            {consultation.recipes.map((item) => (
                                <li key={Date.now()}>
                                    {item.drug}, {item.duration} kun{' '}
                                    {item.frequency} martadan, {item.complement}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button
                    className="my-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handlePrint}
                >
                    chop etish
                </button>
                <button
                    className="mt-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onModalClose}
                >
                    yopish
                </button>
            </>
        )
    } else if (type === 'investigator') {
        content = (
            <>
                <div className="border rounded px-2" ref={contentRef}>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Nomi: </p>
                        <p className="font-semibold text-slate-600">
                            {consultation.name}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">
                            Tekshiruv olingan vaqt:
                        </p>
                        <p className="font-semibold text-slate-600">
                            {new Date(
                                consultation.report['acceptance-date']
                            ).toDateString()}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">
                            Tekshiruv tayyorlangan vaqti :
                        </p>
                        <p className="font-semibold text-slate-600">
                            {new Date(
                                consultation.report['preparation-date']
                            ).toDateString()}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Aniqlandi:</p>
                        <ul>
                            {consultation.report.indicators.map((item) => (
                                <li key={item.id}>
                                    {item.name}: {item.result} normada:
                                    {item.norm}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Xulosa:</p>
                        <p className="font-semibold text-slate-600">
                            {consultation.report.conclusion}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Tekshiruvchi:</p>
                        <p className="font-semibold text-slate-600">
                            {consultation.investigator}
                        </p>
                    </div>
                </div>
                <button
                    className="my-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handlePrint}
                >
                    chop etish
                </button>
                <button
                    className="mt-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onModalClose}
                >
                    yopish
                </button>
            </>
        )
    }

    // console.log("consultation", consultation)
    return content
}

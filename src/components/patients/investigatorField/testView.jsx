/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export const TestView = ({ test, onModalClose }) => {
    const contentRef = useRef(null)
    const handlePrint = useReactToPrint({
        contentRef,
    })
    console.log('Test', test)
    return (
        <>
            <div ref={contentRef}>
                <p>Nomi: {test.name}</p>
                <p>
                    Tekshiruv olingan vaqt:{' '}
                    {new Date(test.report['acceptance-date']).toDateString()}
                </p>
                <p>
                    Tekshiruv tayyorlangan vaqti :{' '}
                    {new Date(test.report['preparation-date']).toDateString()}
                </p>
                <ul>
                    Aniqlandi:
                    {test.report.indicators.map((item) => (
                        <li key={Date.now()}>
                            {item.name}: {item.result} normada:{item.norm}
                        </li>
                    ))}
                </ul>
                <p>Xulosa: {test.conclusion}</p>
                <p>Tekshiruvchi: {test.investigator}</p>
            </div>
            <button onClick={handlePrint}>chop etish</button>
            <button onClick={onModalClose}>yopish</button>
        </>
    )
}

/* eslint-disable react/prop-types */
import React, { useRef } from 'react'

export const MedicalInputRow = ({ onRowChange, rows }) => {
    const indicationRef = useRef()
    const resultRef = useRef()
    const normRef = useRef()

    function handleAddRow(e) {
        e.preventDefault()
        const newRow = {
            id: Date.now(),
            name: indicationRef.current.value,
            result: resultRef.current.value,
            norm: normRef.current.value,
        }
        rows.push(newRow)
        onRowChange((rows) => rows.map((item) => ({ ...item })))
        indicationRef.current.value =
            resultRef.current.value =
            normRef.current.value =
                ''
    }
    function handleDeleteRow(id) {
        onRowChange((rows) =>
            rows.filter((item) => item.id !== id).map((item) => ({ ...item }))
        )
    }

    function handleAddResult(id, value) {
        console.log('item', rows[rows.findIndex((item) => item.id === id)])
        rows[rows.findIndex((item) => item.id === id)].result = value
    }
    console.log('rows', rows)
    return (
        <fieldset>
            <legend>Ko&apos;rsatkichlar</legend>
            {rows.map((item) => (
                <p key={item.id}>
                    {' '}
                    ko&apos;rsatkich nomi:{item.name}
                    {item.result && ` korsatkich qiymati:  ${item.result} `}
                    {!item.result && (
                        <>
                            <label htmlFor={item.name}>qiymati:</label>{' '}
                            <input
                                type="text"
                                id={item.name}
                                name={item.name}
                                onChange={(e) =>
                                    handleAddResult(item.id, e.target.value)
                                }
                            />
                        </>
                    )}
                    normada: {item.norm}
                    <button onClick={() => handleDeleteRow(item.id)}>
                        qatorni o&apos;chirsih
                    </button>
                </p>
            ))}

            <div className="report-row">
                <div className="report-row">
                    <label htmlFor="indication-input">
                        Ko&apos;rsatkich nomi
                    </label>
                    <input
                        type="text"
                        id="indication-input"
                        ref={indicationRef}
                    />
                    <label htmlFor="result-input">
                        Ko&apos;rsatkich natijasi
                    </label>
                    <input type="text" id="result-input" ref={resultRef} />
                    <label htmlFor="norm-input">Ko&apos;rsatkich Normasi</label>
                    <input type="text" id="norm-input" ref={normRef} />
                    <button type="submit" onClick={handleAddRow}>
                        Ko&apos;rsatkichni qo&apos;shish
                    </button>
                </div>
            </div>
        </fieldset>
    )
}

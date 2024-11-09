/* eslint-disable react/prop-types */
import React, { useRef } from 'react'

export const MedicalInputRow = ({ onRowChange, rows, mode }) => {
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
        rows[rows.findIndex((item) => item.id === id)].result = value
    }
    // console.log('rows', rows)
    return (
        <fieldset className="border rounded p-2 py-4">
            <legend className="font-semibold pt-2">Ko&apos;rsatkichlar</legend>
            <table className="table-auto w-full text-left border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3" scope="col">
                            Nomi:
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Qiymati:
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Normada:
                        </th>
                        <th className="px-6 py-3" scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows?.map((item) => (
                        <tr key={item.id} className="p-3 mb-2 border-b">
                            <td className="px-6 py-3">{item.name}</td>
                            <td className="px-6 py-3">
                                {item.result && item.result}
                                {!item.result && (
                                    <>
                                        <label htmlFor={item.name}></label>
                                        <input
                                            type="text"
                                            id={item.name}
                                            className="ml-1 p-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            name={item.name}
                                            disabled={mode === 'template'}
                                            onChange={(e) =>
                                                handleAddResult(
                                                    item.id,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </>
                                )}
                            </td>
                            <td className="px-6 py-3">{item.norm}</td>
                            <td className="px-6 py-3">
                                <button
                                    className="mt-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => handleDeleteRow(item.id)}
                                >
                                    qatorni o&apos;chirish
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-2 pt-2">
                <h4 className="font-semibold mb-2">
                    Ko&apos;rsatkich qo&apos;shish
                </h4>
                <label
                    htmlFor="indication-input"
                    className="ml-1 text-sm/6 font-medium text-gray-900"
                >
                    Nomi
                </label>
                <input
                    type="text"
                    className="p-1 ml-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    id="indication-input"
                    ref={indicationRef}
                />
                <label
                    htmlFor="result-input"
                    className="ml-1 text-sm/6 font-medium text-gray-900"
                >
                    Natijasi
                </label>
                <input
                    type="text"
                    className="ml-1 p-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    id="result-input"
                    ref={resultRef}
                    disabled={mode === 'template'}
                />
                <label
                    htmlFor="norm-input"
                    className="ml-1 text-sm/6 font-medium text-gray-900"
                >
                    {' '}
                    Normasi
                </label>
                <input
                    type="text"
                    className="ml-1 p-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    id="norm-input"
                    ref={normRef}
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="my-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleAddRow}
                    >
                        qo&apos;shish
                    </button>
                </div>
            </div>
        </fieldset>
    )
}

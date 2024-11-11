import React, { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ModalComponent } from '../modalComponent'
import { ViewItem } from './viewItem'

/* eslint-disable react/prop-types */

export const ReportComponent = ({
    startDate,
    endDate,
    name,
    type,
    incomes,
    expenditures,
}) => {
    const [currentItem, setCurrentItem] = useState(null)
    const dialogRef = useRef()
    const contentRef = useRef(null)
    const handlePrint = useReactToPrint({
        contentRef,
    })

    function handleViewItem(item) {
        setCurrentItem(item)
        dialogRef.current.open()
    }
    let content

    if (type === 'report') {
        const income = incomes.reduce(
            (accumulator, item) => accumulator + item.summ,
            0
        )
        const expenditure = expenditures.reduce(
            (accumulator, item) => accumulator + +item.summ,
            0
        )
        content = (
            <>
                <thead className="bg-gray-50">
                    <tr className="p-3 mb-2 border-b">
                        <th className="px-6 py-3" scope="col">
                            Kirimlar
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Chiqimlar
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Balans
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="p-3 mb-2 border-b">
                        <td className="px-6 py-3">{income} </td>
                        <td className="px-6 py-3">{expenditure} </td>
                        <td className="px-6 py-3">{income - expenditure}</td>
                    </tr>
                </tbody>
            </>
        )
    } else if (type === 'revision') {
        const revision = [...incomes, ...expenditures]
        console.log('revision', revision)
        content = (
            <>
                {revision.length === 0 && (
                    <p className="p-4 text-red-600 font-semibold">
                        Kirim chiqimlar yo&apos;q
                    </p>
                )}
                <thead className="bg-gray-50">
                    <tr className="p-3 mb-2 border-b">
                        <th className="px-6 py-3" scope="col">
                            Nomi
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Summa
                        </th>
                        <th className="px-6 py-3" scope="col">
                            Turi
                        </th>
                        <th className="px-6 py-3" scope="col">
                            to&apos;langan vaqti:
                        </th>
                        <th className="px-6 py-3" scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {revision.map((item) => (
                        <tr className="p-3 mb-2 border-b" key={item.id}>
                            {console.log('date...', item)}
                            <td className="px-6 py-3">{item.name} </td>
                            <td className="px-6 py-3">{item.summ}</td>
                            <td className="px-6 py-3">
                                {item.type === 'income' ? 'kirim' : 'chiqim'}
                            </td>
                            <td className="px-6 py-3">
                                {item.type === 'income'
                                    ? item['payment-details']?.date
                                          .toDate()
                                          .toDateString()
                                    : item.time.toDate().toDateString()}
                            </td>
                            <td className="px-6 py-3">
                                <button
                                    className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => handleViewItem(item)}
                                >
                                    ko&apos;rish
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </>
        )
    }
    return (
        <>
            <table
                className="mt-4 table-auto w-full text-left border rounded-md"
                ref={contentRef}
            >
                <caption className="py-4 font-semibold text-left">
                    {name}
                    {type === 'report'
                        ? ' Hisoboti'
                        : type === 'revision'
                          ? ' Sverkasi'
                          : ''}{' '}
                    {`(${startDate} dan ${endDate} gacha)`}
                </caption>
                {content}
            </table>
            <div className="mt-2 flex justify-end">
                <button
                    className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handlePrint}
                >
                    chop etish
                </button>
            </div>
            {type === 'revision' && (
                <ModalComponent ref={dialogRef}>
                    <ViewItem
                        item={currentItem}
                        onModalClose={() => dialogRef.current.close()}
                    />
                </ModalComponent>
            )}
        </>
    )
}

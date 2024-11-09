/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { ModalComponent } from '../../modalComponent'
import { HistoryView } from './historyView'
import { useQuery } from '@tanstack/react-query'
import {
    getPatientConsultations,
    getPatientTest,
} from '../../../firestore/firestore'
import { useParams } from 'react-router-dom'

export const MedicalHistory = ({ type }) => {
    const dialogRef = useRef()
    const params = useParams()
    const [currentHistory, setCurrentHistory] = useState(null)
    const qKey =
        type === 'doctor'
            ? 'consultations'
            : type === 'investigator'
              ? "'tests'"
              : ''
    const qFn =
        type === 'doctor'
            ? () => getPatientConsultations(params.id)
            : type === 'investigator'
              ? () => getPatientTest(params.id)
              : null

    const { data, isPending } = useQuery({
        queryKey: [qKey],
        queryFn: qFn,
    })

    function handleOpenConsultation(currHist) {
        setCurrentHistory(currHist)
        dialogRef.current.open()
    }
    return (
        <div className="p-4">
            {isPending && 'Yuklanmoqda...'}
            {!isPending && (
                <div>
                    <h3 className="font-bold mb-3 text-lg">
                        {`${type === 'doctor' ? "Ko'rik qaydlari" : type === 'investigator' ? 'Tekshiruvlar' : ''}`}{' '}
                    </h3>
                    <table className="table-auto w-full text-left">
                        <thead className=" w-full bg-gray-50">
                            <tr className="p-3 mb-2 border-b">
                                <th className="px-6 py-3" scope="col">
                                    Vaqti
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    To&apos;lov id
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    {type === 'doctor'
                                        ? 'Konsultatsiya'
                                        : type === 'investigator'
                                          ? 'Tekshiruv'
                                          : ''}{' '}
                                    id:
                                </th>
                                <th className="px-6 py-3" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    key={item.date}
                                    className="p-3 mb-2 border-b"
                                >
                                    <td className="px-6 py-3">
                                        {new Date(item.date).toDateString()}
                                    </td>
                                    <td className="px-6 py-3">
                                        {item.paymentId}
                                    </td>
                                    <td className="px-6 py-3">{item.id}</td>
                                    <td className="px-6 py-3">
                                        <button
                                            onClick={() =>
                                                handleOpenConsultation(item)
                                            }
                                            className=" flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            ko&apos;rish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ModalComponent ref={dialogRef}>
                        {currentHistory && (
                            <HistoryView
                                type={type}
                                consultation={currentHistory}
                                onModalClose={() => dialogRef.current.close()}
                            />
                        )}
                    </ModalComponent>
                </div>
            )}
        </div>
    )
}

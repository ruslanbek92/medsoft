import React, { useRef, useState } from 'react'
import { ModalComponent } from '../modalComponent'
import { InvestigatorForm } from '../patients/investigatorField/investigatorForm'
import { useMutation } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseconfig'
import { getCurrentUser } from '../../firestore/firestore'
import { HistoryView } from '../patients/doctorfield/historyView'

/* eslint-disable react/prop-types */

export const TestsComponent = ({ investigations }) => {
    console.log('INVESTIGATIONS')
    const dialogRef = useRef()
    const [currentInvestigation, setCurrentInvestigation] = useState(null)
    const [modalMode, setModalMode] = useState('')

    const { mutate, isMutationPending } = useMutation({
        mutationFn: async ({ paymentId }) => {
            const user = JSON.parse(localStorage.getItem('currentUser'))
            const currentUser = await getCurrentUser(user)
            await updateDoc(doc(db, 'tests', paymentId), {
                status: 'inprogress',
                investigator: currentUser.name,
                report: { 'acceptance-date': new Date() },
            })
        },
        onSuccess: () => {
            alert('success!!!')
        },
    })
    function handleStartInvestigation(paymentId) {
        mutate({ paymentId })
    }
    function handleFinishInvestigation(item) {
        setModalMode('finish')
        setCurrentInvestigation(() => item)
        dialogRef.current.open()
    }
    function handleOpenTestView(currTest) {
        setModalMode('view')
        setCurrentInvestigation(() => currTest)
        dialogRef.current.open()
    }

    return (
        <>
            {isMutationPending && "Jo'natilmoqda..."}
            {!isMutationPending && (
                <div>
                    {investigations.length === 0 && (
                        <p className=" block mt-4 font-semibold text-red-600 text-center">
                            Tekshiruvlar yo&apos;q
                        </p>
                    )}
                    {investigations.length !== 0 && (
                        <table className=" mt-4 table-auto w-full text-left border rounded-md">
                            <thead className="bg-gray-50">
                                <th className="px-6 py-3" scope="col">
                                    Nomi:
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Bemor:
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Maqomi
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Qabul sanasi
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Tayyarolangan sana
                                </th>
                                <th className="px-6 py-3" scope="col"></th>
                            </thead>
                            <tbody>
                                {investigations.map((item) => (
                                    <tr
                                        className="p-3 mb-2 border-b"
                                        key={item.id}
                                    >
                                        <td className="px-6 py-3">
                                            {' '}
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-3">
                                            {' '}
                                            {item.ptName}
                                        </td>
                                        <td className="px-6 py-3">
                                            {' '}
                                            {item.status === 'waiting'
                                                ? 'amalga oshirilmagan'
                                                : item.status === 'inprogress'
                                                  ? 'kutilmoqda'
                                                  : item.status === 'ready'
                                                    ? 'tayyor'
                                                    : ''}
                                        </td>
                                        <td className="px-6 py-3">
                                            {' '}
                                            {item.report['acceptance-date']
                                                .toDate()
                                                .toDateString()}
                                        </td>
                                        <td className="px-6 py-3">
                                            {' '}
                                            {item.report['preparation-date']
                                                .toDate()
                                                .toDateString()}
                                        </td>
                                        <td className="px-6 py-3">
                                            <button
                                                className="my-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                onClick={
                                                    item.status === 'waiting'
                                                        ? () =>
                                                              handleStartInvestigation(
                                                                  item.id
                                                              )
                                                        : item.status ===
                                                            'inprogress'
                                                          ? () =>
                                                                handleFinishInvestigation(
                                                                    item
                                                                )
                                                          : item.status ===
                                                              'ready'
                                                            ? () =>
                                                                  handleOpenTestView(
                                                                      item
                                                                  )
                                                            : null
                                                }
                                            >
                                                {item.status === 'waiting'
                                                    ? 'amalga oshirish'
                                                    : item.status ===
                                                        'inprogress'
                                                      ? 'tayyor qilish'
                                                      : "ko'rish"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <ModalComponent ref={dialogRef}>
                        {modalMode === 'finish' && (
                            <InvestigatorForm
                                investigation={currentInvestigation}
                                onModalClose={() => dialogRef.current.close()}
                            />
                        )}

                        {modalMode === 'view' && (
                            <HistoryView
                                type="investigator"
                                consultation={currentInvestigation}
                                onModalClose={() => dialogRef.current.close()}
                            />
                        )}
                    </ModalComponent>
                </div>
            )}
        </>
    )
}

/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@tanstack/react-query'
import { getTest } from '../../../firestore/firestore'
import React, { useRef } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebaseconfig'
import { ModalComponent } from '../../modalComponent'
import { InvestigatorForm } from './investigatorForm'

export const InvestigatorsField = ({ user, paymentId }) => {
    const dialogRef = useRef()
    function handleOpenModal() {
        dialogRef.current.open()
    }
    const { data, isPending } = useQuery({
        queryKey: ['investigations', paymentId],
        queryFn: () => getTest(paymentId),
    })

    const { mutate, isMutationPending } = useMutation({
        mutationFn: async ({ paymentId }) => {
            await updateDoc(doc(db, 'tests', paymentId), {
                status: 'inprogress',
                investigator: user.name,
                report: { 'acceptance-date': new Date() },
            })
        },
        onSuccess: () => {
            alert('success!!!')
        },
    })

    function handleStartInvestigation() {
        mutate({ paymentId })
    }
    return (
        <div className="p-4 mt-4 border rounded-md border-gray-400 shadow-md">
            <h3 className="font-bold mb-3 text-lg">Tekshiruvchi maydoni</h3>
            {isPending && 'Yuklanmoqda...'}
            {isMutationPending && "Jo'natilmoqda..."}
            {!isPending && !isMutationPending && (
                <div className="">
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Nomi:</p>
                        <p className="font-semibold text-slate-600">
                            {data.name}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Idsi:</p>
                        <p className="font-semibold text-slate-600">
                            {data.paymentId}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Maqomi:</p>
                        <p className="font-semibold text-slate-600">
                            {data.status === 'waiting'
                                ? 'amalga oshirilmagan'
                                : data.status === 'inprogress'
                                  ? 'natija kutilmoqda'
                                  : 'tayyor'}
                        </p>
                    </div>
                    <button
                        className="my-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={
                            data.status === 'waiting'
                                ? handleStartInvestigation
                                : data.status === 'inprogress'
                                  ? handleOpenModal
                                  : null
                        }
                    >
                        {data.status === 'waiting'
                            ? 'amalga oshirish'
                            : data.status === 'inprogress'
                              ? 'tayyor qilish'
                              : ''}
                    </button>
                </div>
            )}
            <ModalComponent ref={dialogRef}>
                {!isPending && (
                    <InvestigatorForm
                        investigation={data}
                        onModalClose={() => dialogRef.current.close()}
                    />
                )}
            </ModalComponent>
        </div>
    )
}

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
    // console.log("user", user)
    // console.log('data', data)
    return (
        <div className="investigator-field">
            <h3>Tekshiruvchi maydoni</h3>
            {isPending && 'Yuklanmoqda...'}
            {isMutationPending && "Jo'natilmoqda..."}
            {!isPending && !isMutationPending && (
                <div className="investigation-card">
                    <p>Nomi: {data.name}</p>
                    <p>Idsi: {data.paymentId}</p>
                    <p>
                        maqomi:{' '}
                        {data.status === 'waiting'
                            ? 'amalga oshirilmagan'
                            : data.status === 'inprogress'
                              ? 'natija kutilmoqda'
                              : 'tayyor'}
                    </p>
                    {data.status === 'waiting' && (
                        <button onClick={handleStartInvestigation}>
                            amalga oshirish
                        </button>
                    )}
                    {data.status === 'inprogress' && (
                        <button onClick={handleOpenModal}>tayyor qilish</button>
                    )}
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

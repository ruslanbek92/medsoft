/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useParams, useSearchParams } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import { ConsultationForm } from '../patients/doctorfield/consultationForm'
import { getQueueById } from '../../firestore/firestore'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { InvestigatorsField } from '../patients/investigatorField/investiagtorsField'

const QueueControl = ({ user }) => {
    const [searchParams] = useSearchParams()
    const params = useParams()
    const paymentId = searchParams.get('paymentId')
    const queueId = searchParams.get('queueId')
    const roomId = searchParams.get('room')
    const {
        data: queue,
        isPending: isQueuePending,
        refetch: refetchQueue,
    } = useQuery({
        queryKey: ['queue'],
        queryFn: () => getQueueById(roomId, queueId),
    })

    const { mutate, isPending: isMutationPending } = useMutation({
        queryKey: ['queue'],
        mutationFn: handleQueue,
        onSuccess: () => {
            alert("navbat maqomi muvaffaqiyatli o'zgartirildi")
            refetchQueue()
        },
    })

    async function handleQueue({ command }) {
        if (command === 'start') {
            await updateDoc(doc(db, 'queues', roomId, 'queues', queueId), {
                status: 'inprogress',
            })
        } else if (command === 'stop') {
            await deleteDoc(doc(db, 'queues', roomId, 'queues', queueId))
            await updateDoc(
                doc(db, 'patients', params.id, 'payments', paymentId),
                { isProvided: true }
            )
        }
    }

    let content
    if (!queue) {
        content = (
            <p className="p-4 inline-block text-red-600 font-semibold border rounded-md shadow-sm bg-gray-50 ">
                Qabul yakunlangan !
            </p>
        )
    } else {
        content = (
            <>
                <button
                    className=" m-auto flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() =>
                        mutate({
                            command:
                                queue.status === 'waiting'
                                    ? 'start'
                                    : queue.status === 'inprogress'
                                      ? 'stop'
                                      : '',
                        })
                    }
                >
                    {queue.status === 'waiting'
                        ? 'Qabulni boshlash'
                        : queue.status === 'inprogress'
                          ? 'Qabulni yakunlash'
                          : ''}
                </button>
                {queue.status === 'inprogress' && (
                    <>
                        {user.role === 'doctor' && (
                            <ConsultationForm
                                patientId={params.id}
                                paymentId={paymentId}
                                onNewConsultAdded={() => refetch()}
                            />
                        )}
                        {user.role === 'investigator' && (
                            <InvestigatorsField
                                user={user}
                                paymentId={paymentId}
                            />
                        )}
                    </>
                )}
            </>
        )
    }

    return (
        <div className="p-4">
            {isMutationPending && "Jo'natilmoqda"}
            {isQueuePending && 'Yuklanmoqda ...'}
            {!isQueuePending && !isMutationPending && content}
        </div>
    )
}

export default QueueControl

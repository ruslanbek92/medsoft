/* eslint-disable no-undef */
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useParams, useSearchParams } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import { ConsultationForm } from './consultationForm'
import { Consultations } from './consultations'
import {
    getPatientConsultations,
    getQueueById,
} from '../../firestore/firestore'
import { useMutation, useQueries } from '@tanstack/react-query'
import React from 'react'

export const DoctorsField = () => {
    const [searchParams] = useSearchParams()
    const params = useParams()
    const paymentId = searchParams.get('paymentId')
    const queueId = searchParams.get('queueId')
    const roomId = searchParams.get('room')
    // console.log('room', roomId)

    const [
        { data: queue, isPending: isQueuePending, refetch: refetchQueue },
        { data: consultations, isPending: isConsultationsPending, refetch },
    ] = useQueries({
        queries: [
            {
                queryKey: ['queue'],
                queryFn: () => getQueueById(roomId, queueId),
            },
            {
                queryKey: ['consultations'],
                queryFn: () => getPatientConsultations(params.id),
            },
        ],
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
        // console.log("handle queue comman", command)
        if (command === 'start') {
            await updateDoc(doc(db, 'queues', roomId, 'queues', queueId), {
                status: 'inprogress',
            })
        } else if (command === 'stop') {
            // console.log("stop")
            await deleteDoc(doc(db, 'queues', roomId, 'queues', queueId))
            await updateDoc(
                doc(db, 'patients', params.id, 'payments', paymentId),
                { isProvided: true }
            )
        }
    }
    // console.log("Doctors field",consultations)
    return (
        <div className="dr-field">
            <h3>Doctors field</h3>
            {isMutationPending && "Jo'natilmoqda"}
            {(isQueuePending || isConsultationsPending) && 'Yuklanmoqda ...'}
            {!isQueuePending &&
                !isConsultationsPending &&
                !isMutationPending && (
                    <>
                        <Consultations consultations={consultations} />
                        {queue && (
                            <>
                                <ConsultationForm
                                    patientId={params.id}
                                    paymentId={paymentId}
                                    onNewConsultAdded={() => refetch()}
                                />
                                <button
                                    onClick={() =>
                                        mutate({
                                            command:
                                                queue.status === 'waiting'
                                                    ? 'start'
                                                    : queue.status ===
                                                        'inprogress'
                                                      ? 'stop'
                                                      : '',
                                        })
                                    }
                                >
                                    {queue.status === 'waiting'
                                        ? 'qabulni boshlash'
                                        : queue.status === 'inprogress'
                                          ? 'qabulni yakunlash'
                                          : ''}
                                </button>
                            </>
                        )}
                        {!queue && 'Qabul yakunlangan'}
                    </>
                )}
        </div>
    )
}

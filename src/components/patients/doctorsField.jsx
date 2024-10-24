/* eslint-disable no-undef */
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import { ConsultationForm } from './consultationForm'
import { Consultations } from './consultations'
import { getCurrentUser } from '../../firestore/firestore'

export const DoctorsField = () => {
    const [loading, setLoading] = useState(true)
    const [queue, setQueue] = useState(null)
    const [consultations, setConsultations] = useState([])
    const [searchParams] = useSearchParams()
    const params = useParams()
    const paymentId = searchParams.get('paymentId')
    const queueId = searchParams.get('queueId')
    const roomId = searchParams.get('room')
    console.log('room', roomId)

    useEffect(() => {
        async function getQueueAndConsultations(roomId, queueId) {
            let queue
            if (roomId && queueId) {
                queue = (
                    await getDoc(doc(db, 'queues', roomId, 'queues', queueId))
                ).data()
            }

            const currentUser = await getCurrentUser(
                JSON.parse(localStorage.getItem('currentUser'))
            )

            // console.log('currentuser', currentUser)
            const q = query(
                collection(db, 'consultations'),
                where('patientId', '==', params.id),
                where('doctor', '==', currentUser.name)
            )
            const consultations = (await getDocs(q)).docs.map((item) => ({
                ...item.data(),
                id: item.id,
            }))
            setConsultations(consultations)
            if (queue) setQueue(() => queue)
            setLoading(false)
        }

        getQueueAndConsultations(roomId, queueId)
    }, [])
    async function handleStart() {
        setLoading(true)
        const queueRef = doc(db, 'queues', roomId, 'queues', queueId)
        await updateDoc(queueRef, { status: 'inprogress' })
        const queue = (
            await getDoc(doc(db, 'queues', roomId, 'queues', queueId))
        ).data()
        setQueue(() => queue)
        setLoading(false)
    }

    async function handleStop() {
        setLoading(true)
        const paymentRef = doc(db, 'patients', params.id, 'payments', paymentId)
        await deleteDoc(doc(db, 'queues', roomId, 'queues', queueId))
        await updateDoc(paymentRef, { isProvided: true })
        setQueue(() => null)
        setLoading(false)
    }
    async function handleNewConsultAdded() {
        const currentUser = await getCurrentUser(
            JSON.parse(localStorage.getItem('currentUser'))
        )
        const q = query(
            collection(db, 'consultations'),
            where('patientId', '==', params.id),
            where('doctor', '==', currentUser.name)
        )
        const consultations = (await getDocs(q)).docs.map((item) => ({
            ...item.data(),
            id: item.id,
        }))
        // console.log('upper consultations', consultations)
        setConsultations(consultations)
    }
    // console.log("Doctors field",consultations)
    return (
        <div className="dr-field">
            <h3>Doctors field</h3>
            {loading && 'Yuklanmoqda ...'}
            {!loading && (
                <>
                    <Consultations consultations={consultations} />
                    {queue && (
                        <ConsultationForm
                            patientId={params.id}
                            paymentId={paymentId}
                            onNewConsultAdded={handleNewConsultAdded}
                        />
                    )}
                    {queue &&
                        (queue.status === 'waiting' ? (
                            <button onClick={handleStart}>
                                qabulni boshlash
                            </button>
                        ) : queue.status === 'inprogress' ? (
                            <button onClick={handleStop}>
                                qabulni yakunlash
                            </button>
                        ) : (
                            ''
                        ))}
                    {!queue && 'Qabul yakunlangan'}
                </>
            )}
        </div>
    )
}

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import { db } from '../firebaseconfig'

export async function getPatientsWithDebt() {
    const q = query(collection(db, 'patients'), where('hasDebt', '==', true))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((item) => item.data())
}
export async function getPaymentsById(patientId) {
    const querySnapshot = await getDocs(
        collection(db, 'patients', patientId, 'payments')
    )
    const result = querySnapshot.docs.map((item) => ({
        ...item.data(),
        id: item.id,
    }))
    return result
}
export async function addPayment(payment, patientId) {
    await addDoc(collection(db, 'patients', patientId, 'payments'), payment)
}
export async function deletePayment(patientId, paymentId) {
    await deleteDoc(doc(db, 'patients', patientId, 'payments', paymentId))
}

export async function getQueues() {
    const querySnapshot = await getDocs(collection(db, 'queues'))
    return querySnapshot.docs
}
export async function getDoctorsOrInvestigations(type) {
    const querySnapshot = await getDocs(collection(db, type))
    return querySnapshot.docs.map((item) => item.data())
}

export async function createPatient(patient) {
    await setDoc(doc(db, 'patients', patient['pt-passport']), patient)
}

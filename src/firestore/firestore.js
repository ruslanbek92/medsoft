import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import { db } from '../firebaseconfig'

export async function getPaymentsById(id) {
    const collectionRef = collection(db, 'payments')
    const q = query(collectionRef, where('patientId', '==', id))
    const querySnapshot = await getDocs(q)
    return querySnapshot
}

export async function getPayments() {
    const querySnapshot = await getDocs(collection(db, 'payments'))
    const result = querySnapshot.docs.map((item) => item.data())
    return result
}
export async function getQueues() {
    const querySnapshot = await getDocs(collection(db, 'queues'))
    return querySnapshot.docs
}
export async function getDoctorsOrInvestigations(type) {
    const querySnapshot = await getDocs(collection(db, type))
    return querySnapshot.docs.map((item) => item.data())
}
export async function addPayment(payment) {
    await addDoc(collection(db, 'payments'), payment)
}

export async function createPatient(patient) {
    await setDoc(doc(db, 'patients', patient['pt-passport']), patient)
}

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import { db } from '../firebaseconfig'

export async function getCurrentUser(user) {
    const docSnap = await getDoc(doc(db, 'users', user.uid))
    return docSnap.data()
}
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

export async function getQueues(user, userRole) {
    if (userRole === 'doctor' || userRole === 'investigator') {
        let roomNumber = (
            await getDoc(doc(db, userRole + 's', user.uid))
        ).data().room
        return [{ id: roomNumber }]
    } else {
        const querySnapshot = await getDocs(collection(db, 'queues'))
        return querySnapshot.docs.map((item) => ({ id: item.id }))
    }
}
export async function getQueueById(roomId, queueId) {
    if (roomId && queueId) {
        const queue = (
            await getDoc(doc(db, 'queues', roomId, 'queues', queueId))
        ).data()
        if (!queue) {
            return null
        }
        return queue
    }
    return null
}
export async function getRoomQueue(roomId) {
    const querySnapshot = await getDocs(
        collection(db, 'queues', roomId + '', 'queues')
    )
    return querySnapshot.docs.map((el) => ({ ...el.data(), id: el.id }))
}
export async function getDoctorsOrInvestigations(type) {
    const querySnapshot = await getDocs(collection(db, type))
    return querySnapshot.docs.map((item) => item.data())
}

export async function getPatientConsultations(patientId) {
    const currentUser = await getCurrentUser(
        JSON.parse(localStorage.getItem('currentUser'))
    )
    const q = query(
        collection(db, 'consultations'),
        where('patientId', '==', patientId),
        where('doctor', '==', currentUser.name)
    )
    const consultations = (await getDocs(q)).docs.map((item) => ({
        ...item.data(),
        id: item.id,
    }))
    return consultations
}

export async function getAllTests() {
    const querySnapshot = await getDocs(collection(db, 'tests'))
    if (querySnapshot) {
        return querySnapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id,
        }))
    }
    return []
}
export async function getPatientTest(patientId) {
    const currentUser = await getCurrentUser(
        JSON.parse(localStorage.getItem('currentUser'))
    )
    const q = query(
        collection(db, 'tests'),
        where('patientId', '==', patientId),
        where('investigator', '==', currentUser.name)
    )
    const tests = (await getDocs(q)).docs.map((item) => ({
        ...item.data(),
        id: item.id,
    }))
    return tests.filter((item) => item.status === 'ready')
}
export async function createPatient(patient) {
    await setDoc(doc(db, 'patients', patient['pt-passport']), patient)
}
export async function getInvestigationsAndTemplates() {
    const investigations = await getDoctorsOrInvestigations('investigations')
    const templates = (
        await getDocs(collection(db, 'doctor-templates'))
    ).docs.map((item) => ({ ...item.data(), id: item.id }))
    return { investigations, templates }
}

export async function addConsultationOrTemplate({ mode, name, consultation }) {
    if (mode === 'template') {
        await addDoc(collection(db, 'doctor-templates'), {
            ...consultation,
            name: name,
        })
    } else {
        await addDoc(collection(db, 'consultations'), consultation)
    }
}
export async function getPaymentsForReport(name, startDate, endDate) {
    const patientsSnapshot = await getDocs(collection(db, 'patients'))
    let filteredPayments = []
    for (const patientDoc of patientsSnapshot.docs) {
        const paymentsRef = collection(
            db,
            'patients',
            patientDoc.id,
            'payments'
        )
        let paymentsQuery
        if (name !== 'cashier') {
            paymentsQuery = query(
                paymentsRef,
                where('name', '==', name),
                where('isProvided', '==', true),
                where('payment-details.date', '>=', new Date(startDate)),
                where('payment-details.date', '<=', new Date(endDate))
            )
        } else {
            paymentsQuery = query(
                paymentsRef,
                where('isProvided', '==', true),
                where('payment-details.date', '>=', new Date(startDate)),
                where('payment-details.date', '<=', new Date(endDate))
            )
        }

        const paymentDocs = await getDocs(paymentsQuery)

        // Collect matching payments
        paymentDocs.forEach((doc) => {
            filteredPayments.push({ id: doc.id, ...doc.data(), type: 'income' })
        })
    }
    return filteredPayments
}

export async function getExpendituresForReport(type, startDate, endDate) {
    let q
    if (type !== 'cashier') {
        q = query(
            collection(db, 'expenditures'),
            where('type', '==', type),
            where('time', '>=', new Date(startDate)),
            where('time', '<=', new Date(endDate))
        )
    } else {
        q = query(
            collection(db, 'expenditures'),
            where('time', '>=', new Date(startDate)),
            where('time', '<=', new Date(endDate))
        )
    }
    return (await getDocs(q)).docs.map((item) => ({
        id: item.id,
        ...item.data(),
        name: item.data().type,
        type: 'expenditure',
    }))
}
export async function getTest(paymentId) {
    return (await getDoc(doc(db, 'tests', paymentId))).data()
}
export async function getInvestigationTemplate(name) {
    const querySnapShots = await getDocs(collection(db, 'investigations'))
    const investigation = querySnapShots.docs
        .map((item) => item.data())
        .find((item) => item.name === name)
    if (investigation) {
        return investigation.template || null
    }
    return null
}

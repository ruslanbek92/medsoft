/* eslint-disable no-undef */
const {onDocumentWritten}= require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

exports.hasDebt = onDocumentWritten('patients/{patientId}/payments/{paymentId}', async ({params})=>{
    
    let hasDebt=false;
    let debtAmount=0;
    const patientRef = getFirestore().collection('patients').doc(params.patientId)
    const paymentsSnapshot = await patientRef.collection("payments").get();
    
    paymentsSnapshot.docs.forEach(element => {
        if (element.data().status === 'unpaid') {
                        hasDebt = true;
            }
    });
    debtAmount= paymentsSnapshot.docs.filter(item=>item.data().status ==="unpaid").reduce((accumulator,element)=> accumulator+element.data().summ,0);
    patientRef.update({hasDebt,debtAmount})
       
})

exports.addPaymentToQueue=onDocumentWritten('patients/{patientId}/payments/{paymentId}', async ({params})=>{
console.log("patiient ID", params.patientId, "payment id", params.paymentId)
    const patientRef = getFirestore().collection('patients').doc(params.patientId)
    const payment = (await patientRef.collection("payments").doc(params.paymentId).get()).data();
     console.log("payment", payment)
    if (payment.status === "paid" && !payment.isProvided) {
        const collectionName = payment.type === "investigation"?"investigations":payment.type === "consultation"? "doctors":""
        const roomNum = (await getFirestore().collection(collectionName).get()).docs.map(item=>item.data()).find(item=>item.name ===payment.name).room;
        console.log("number", roomNum)
        const queueRef = getFirestore().collection("queues").doc(roomNum).collection("queues");
        const patient = (await patientRef.get()).data();
        await queueRef.add({patientId:params.patientId,ptName:patient["pt-name"]+patient["pt-surname"], paymentId:params.paymentId, status:"waiting", time:new Date()})
    }
      
})

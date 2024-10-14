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
    console.log("paymentsSnapshot",paymentsSnapshot.docs.filter(item=>item.data().status ==="unpaid"))
    debtAmount= paymentsSnapshot.docs.filter(item=>item.data().status ==="unpaid").reduce((accumulator,element)=> accumulator+element.data().summ,0);
    patientRef.update({hasDebt,debtAmount})
       
})

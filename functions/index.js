const {onDocumentWritten}= require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
initializeApp();

exports.myfunction = onDocumentWritten('patients/{patientId}/payments/{paymentId}', async ({params})=>{
    
    let hasDebt=false;
    const patientRef = getFirestore().collection('patients').doc(params.patientId)
    const paymentsSnapshot = await patientRef.collection("payments").get();
    console.log("paymentsSnapshot",paymentsSnapshot.docs)
    paymentsSnapshot.docs.forEach(element => {
        if (element.data().status === 'unpaid') {
                        hasDebt = true;
            }
    });

    patientRef.update({hasDebt})
       
})
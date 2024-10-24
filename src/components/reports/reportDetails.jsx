import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigation,
} from 'react-router-dom'
import { db } from '../../firebaseconfig'
import Input from '../input'
import {
    getCurrentUser,
    getExpendituresForReport,
    getPaymentsForReport,
} from '../../firestore/firestore'
import { ReportComponent } from './reportComponent'

export const ReportDetails = () => {
    const data = useLoaderData()
    const actionData = useActionData()
    const navigation = useNavigation()
    console.log(' data', actionData)
    return (
        <div>
            {navigation.state === 'submitting' && "Jo'natilmoqda..."}
            {navigation.state === 'idle' && (
                <>
                    <h3>Hisobot detallari </h3>
                    <Form method="post" className="reports-form">
                        <Input
                            type="date"
                            id="start-date"
                            name="start-date"
                            label="Boshlang'ich sana"
                            required={true}
                        />
                        <Input
                            type="date"
                            id="end-date"
                            name="end-date"
                            label="Yakuniy sana"
                            required={true}
                        />
                        <label htmlFor="report-select"></label>
                        <select
                            id="report-select"
                            name="report-select"
                            required
                        >
                            {data.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <button>qidirish</button>
                    </Form>
                    {actionData && (
                        <ReportComponent
                            name={actionData.name}
                            type={actionData.type}
                            incomes={actionData.incomes}
                            expenditures={actionData.expenditures}
                        />
                    )}
                </>
            )}
        </div>
    )
}

export async function loader({ params }) {
    const reportType = params.type.slice(0, params.type.indexOf('-'))
    const currentUser = await getCurrentUser(
        JSON.parse(localStorage.getItem('currentUser'))
    )

    if (reportType === 'doctor') {
        if (currentUser.role === 'doctor') {
            return [currentUser.name]
        }
        return (await getDocs(collection(db, 'doctors'))).docs.map(
            (item) => item.data().name
        )
    } else if (reportType === 'investigator') {
        if (currentUser.role === 'investigator') {
            return [currentUser.name]
        }
        return (await getDocs(collection(db, 'investigators'))).docs.map(
            (item) => item.data().name
        )
    } else if (reportType === 'cashier') {
        return ['cashier']
    }
}
export async function action({ request, params }) {
    const reportType = params.type.slice(params.type.indexOf('-') + 1)
    const formData = await request.formData()
    const requestObj = {
        name: formData.get('report-select'),
        startDate: formData.get('start-date'),
        endDate: formData.get('end-date'),
    }
    console.log('requestObj', requestObj)
    const incomes = await getPaymentsForReport(
        requestObj.name,
        requestObj.startDate,
        requestObj.endDate
    )
    const expenditures = await getExpendituresForReport(
        requestObj.name,
        requestObj.startDate,
        requestObj.endDate
    )
    if (reportType === 'report') {
        return { type: 'report', name: requestObj.name, incomes, expenditures }
    } else if (reportType === 'revision') {
        return {
            type: 'revision',
            name: requestObj.name,
            incomes,
            expenditures,
        }
    }
}

import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigation,
    useParams,
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
    const params = useParams()
    const reportType = params.type.slice(params.type.indexOf('-') + 1)
    console.log(' data', actionData)
    return (
        <div className="p-4 pt-8 w-full md:w-4/5">
            {navigation.state === 'submitting' && "Jo'natilmoqda..."}
            {navigation.state === 'idle' && (
                <>
                    <h2 className="text-2xl pl-2 pb-4 mb-4 font-bold border-b border-b-gray-400 shadow-md">
                        {`${reportType === 'report' ? 'Hisobot' : 'Sverka'}`}{' '}
                    </h2>
                    <Form method="post" className="">
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
                        <label
                            htmlFor="report-select"
                            className="block font-medium mr-2 text-gray-900"
                        >
                            Tekshiruvchi
                        </label>
                        <select
                            id="report-select"
                            className="block mt-2 rounded-md border p-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            name="report-select"
                            required
                        >
                            <option value="">tanlang</option>
                            {data.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <div className="mt-2 gap-4 flex justify-end">
                            <button
                                type="reset"
                                className="border border-gray-500 rounded-md px-3 py-1.5 text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                bekor qilish
                            </button>
                            <button className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                tayyorlash
                            </button>
                        </div>
                    </Form>
                    {actionData && (
                        <ReportComponent
                            startDate={actionData.startDate}
                            endDate={actionData.endDate}
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
    // console.log('requestObj', requestObj)
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
        return {
            type: 'report',
            name: requestObj.name,
            startDate: requestObj.startDate,
            endDate: requestObj.endDate,
            incomes,
            expenditures,
        }
    } else if (reportType === 'revision') {
        return {
            type: 'revision',
            name: requestObj.name,
            startDate: requestObj.startDate,
            endDate: requestObj.endDate,
            incomes,
            expenditures,
        }
    }
}

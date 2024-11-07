/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { GeneralInfo } from './GeneralInfo'
import PatientPayments from './patientPayments'
import { MedicalHistory } from './doctorfield/medicalHistory'
import QueueControl from '../queues/queueControl'

export const PatientTab = ({ patient, user }) => {
    let tabList = ["Umumiy Ma'lumotlar", "To'lovlar"]
    if (user.role === 'doctor' || user.role === 'investigator')
        tabList.push('Tibbiy Tarix', 'Navbat Nazorati')
    if (user.role === 'admin' || user.role === 'registrator')
        tabList.push('MedicalHistory')
    let initialState = tabList[0]
    if (user.role === 'doctor' || user.role === 'investigator')
        initialState = tabList[3]
    if (user.role === 'cashier') initialState = tabList[1]
    const [currentTab, setCurrentTab] = useState(initialState)

    return (
        <div className="border border-gray-400 shadow-md rounded-md">
            <nav className="py-6 px-4">
                <ul className="flex gap-6">
                    {tabList.map((item, index) => (
                        <li
                            className={`pb-4  font-bold  text-slate-600 cursor-pointer hover:text-gray-900 hover:border-b-2 ${currentTab === item ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}
                            key={index}
                            onClick={() => setCurrentTab(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </nav>

            {currentTab === "Umumiy Ma'lumotlar" && (
                <GeneralInfo patient={patient} />
            )}
            {currentTab === "To'lovlar" && (
                <PatientPayments patient={patient} user={user} />
            )}
            {currentTab === 'Tibbiy Tarix' && (
                <MedicalHistory type={user.role} />
            )}
            {currentTab === 'Navbat Nazorati' && <QueueControl user={user} />}
        </div>
    )
}

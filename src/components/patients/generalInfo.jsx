/* eslint-disable react/prop-types */
import React from 'react'

export const GeneralInfo = ({ patient }) => {
    return (
        <div className="p-4">
            <h3 className="font-bold mb-3 text-lg">Umumiy ma&apos;lumotlar</h3>
            <div className="py-3 flex flex-col md:flex-row  border-b">
                <p className="font-semibold w-72">Bemor ismi:</p>
                <p className="text-slate-600 font-semibold">
                    {patient['pt-name']}
                </p>
            </div>
            <div className="py-3 flex flex-col md:flex-row  border-b">
                <p className="font-semibold w-72">Bemor Familyasi:</p>
                <p className="text-slate-600 font-semibold">
                    {' '}
                    {patient['pt-surname']}
                </p>
            </div>
            <div className="py-3 flex flex-col md:flex-row  border-b">
                <p className="font-semibold w-72">Royxatdan otgan sanasi:</p>
                <p className="text-slate-600 font-semibold"> {patient.dor}</p>
            </div>
            <div className="py-3 flex flex-col md:flex-row  border-b">
                <p className="font-semibold w-72">Tugilgan sanasi:</p>
                <p className="text-slate-600 font-semibold">
                    {' '}
                    {patient['pt-dob']}
                </p>
            </div>
            <div className="py-3 flex flex-col md:flex-row  border-b">
                <p className="font-semibold w-72">Qabul turi:</p>
                <p className="text-slate-600 font-semibold">
                    {' '}
                    {patient['pt-type']}
                </p>
            </div>
            <div className="py-3 flex flex-col md:flex-row  border-b">
                <p className="font-semibold w-72">
                    Bemor identifikatsion raqami:
                </p>
                <p className="text-slate-600 font-semibold">
                    {' '}
                    {patient['pt-passport']}
                </p>
            </div>
            <div className="py-3 flex flex-col md:flex-row  border-b">
                <p className="font-semibold w-72">Bemor manzili: </p>
                <p className="text-slate-600 font-semibold">
                    {patient['pt-address']}
                </p>
            </div>
        </div>
    )
}

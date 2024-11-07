import React, { useState } from 'react'
import { redirect } from 'react-router-dom'
import { getAllTests, getCurrentUser } from '../firestore/firestore'
import { queryClient } from '../main'
import { useQuery } from '@tanstack/react-query'
import { TestsComponent } from '../components/tests/testsComponent'
import { Filters } from '../components/tests/filters'

function Investigations() {
    const { data, isPending } = useQuery({
        queryKey: ['tests'],
        queryFn: () => getAllTests(),
    })

    const [filteredData, setFilteredData] = useState(data)

    console.log('data', data)
    return (
        <div className="p-4 pt-8 w-full md:w-4/5">
            <h2 className="text-2xl pl-2 pb-4 mb-4 font-bold border-b border-b-gray-400 shadow-md">
                Tekshiruvlar
            </h2>
            {isPending && 'Yuklanmoqda...'}
            {!isPending && (
                <>
                    <Filters onDataChange={setFilteredData} data={data} />
                    <TestsComponent investigations={filteredData} />
                </>
            )}
        </div>
    )
}

export async function loader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
        const currentUser = await getCurrentUser(user)
        if (
            currentUser.role === 'cashier' ||
            currentUser.role === 'registration' ||
            currentUser.role === 'doctor'
        ) {
            return redirect('/')
        } else {
            return queryClient.fetchQuery({
                queryKey: ['tests'],
                queryFn: () => getAllTests(),
            })
        }
    } else return null
}

export default Investigations

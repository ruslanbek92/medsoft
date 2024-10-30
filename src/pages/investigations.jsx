import React, { useState } from 'react'
import { redirect } from 'react-router-dom'
import { getAllTests, getCurrentUser } from '../firestore/firestore'
import { queryClient } from '../main'
import { useQuery } from '@tanstack/react-query'
import { InvestigationsComponent } from '../components/investigations/investigationsComponent'
import { Filters } from '../components/investigations/filters'

function Investigations() {
    const { data, isPending } = useQuery({
        queryKey: ['tests'],
        queryFn: () => getAllTests(),
    })

    const [filteredData, setFilteredData] = useState(data)

    console.log('data', data)
    return (
        <div>
            <h3>tekshiruvlar</h3>
            {isPending && 'Yuklanmoqda...'}
            {!isPending && (
                <>
                    <Filters onDataChange={setFilteredData} data={data} />
                    <InvestigationsComponent investigations={filteredData} />
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

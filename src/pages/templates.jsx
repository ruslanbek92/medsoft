import React from 'react'
import { getCurrentUser, getInvestigationsByType } from '../firestore/firestore'
import { redirect, useLoaderData } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { InvestigationsComponent } from '../components/templates/investigationsComponent'
import { TemplatesComponent } from '../components/templates/templatesComponent'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseconfig'

export const Templates = () => {
    const data = useLoaderData()
    const {
        data: investigations,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ['investigations', data.name],
        queryFn: () => getInvestigationsByType(data.name),
    })
    const { mutate, isPending: isMutationPending } = useMutation({
        mutationKey: ['investigations', data.name],
        mutationFn: ({ id }) => {
            deleteDoc(doc(db, 'investigations', id))
        },
        onSuccess: () => {
            refetch()
            alert("muvaffaqiyatli o'chirildi!")
        },
    })
    function handleInvestigationDelete(id) {
        mutate({ id })
    }

    let content
    if (isPending) content = 'Yuklanmoqda...'
    if (isMutationPending) content = 'Bajarilmoqda...'
    if (!isPending && !isMutationPending) {
        content = (
            <div>
                <InvestigationsComponent
                    investigations={investigations}
                    user={data}
                    refetchFn={refetch}
                    onDelete={handleInvestigationDelete}
                />
                <TemplatesComponent
                    investigations={investigations}
                    refetchFn={refetch}
                />
            </div>
        )
    }
    //   console.log("investigations",investigations)
    return content
}

export async function loader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
        const currentUser = await getCurrentUser(user)
        if (
            currentUser.role === 'cashier' ||
            currentUser.role === 'doctor' ||
            currentUser.role === 'registrator'
        ) {
            return redirect('/')
        } else {
            return currentUser
        }
    } else return null
}

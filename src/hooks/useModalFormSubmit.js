import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function useFormSubmit(submitFunc, onModalClose) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formLoading, setformLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        setformLoading(true)
        await submitFunc(e)
        e.target.reset()
        setformLoading(false)
        onModalClose()
        navigate(`/main/patients/${id}`)
    }
    return { formLoading, handleSubmit }
}

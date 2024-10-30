import { useQuery } from '@tanstack/react-query'
import { getPatientTest } from '../../../firestore/firestore'
import { useParams } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { ModalComponent } from '../../modalComponent'
import { TestView } from './testView'

export const Tests = () => {
    const params = useParams()
    const dialogRef = useRef()
    const [test, setTest] = useState(null)
    const { data, isPending } = useQuery({
        queryKey: ['tests'],
        queryFn: () => getPatientTest(params.id),
    })

    function handleOpenTest(test) {
        setTest(test)
        dialogRef.current.open()
    }
    console.log('TESTS', data)
    return (
        <>
            {isPending && 'Yuklanmoqda...'}
            {!isPending && (
                <div className="tests">
                    <h3>Tekshiruvlar</h3>
                    <ul>
                        {data.map((item) => (
                            <li className="test" key={item.time}>
                                {' '}
                                to&apos;lov id {item.paymentId} test id:
                                {item.id}
                                <button onClick={() => handleOpenTest(item)}>
                                    ko&apos;rish
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ModalComponent ref={dialogRef}>
                        {test && (
                            <TestView
                                test={test}
                                onModalClose={() => dialogRef.current.close()}
                            />
                        )}
                    </ModalComponent>
                </div>
            )}
        </>
    )
}

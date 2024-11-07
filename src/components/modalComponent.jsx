/* eslint-disable react/prop-types */
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

export const ModalComponent = forwardRef(function ModalComponent(
    { children },
    ref
) {
    const dialog = useRef()
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            },
            close() {
                dialog.current.close()
            },
        }
    }, [])

    return createPortal(
        <dialog className="p-6 pt-8 rounded-lg" ref={dialog}>
            {children}
        </dialog>,
        document.getElementById('modal')
    )
})

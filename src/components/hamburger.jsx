import React, { useContext } from 'react'
import { AppContext } from '../context'
export const Hamburger = () => {
    const context = useContext(AppContext)
    return (
        <div
            className="md:hidden w-6 h-6 cursor-pointer"
            onClick={() => context.setState()}
        >
            <hr
                className={`border border-white  ${context.state ? 'mb-0 rotate-45' : 'mb-2'}`}
            />
            <hr
                className={`border border-white ${context.state ? 'mb-0 -rotate-45' : 'mb-2'}`}
            />
        </div>
    )
}

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Hamburger } from './hamburger'
import { AppContext } from '../context'

/* eslint-disable-next-line */
function Sidebar({ role }) {
    const context = useContext(AppContext)
    console.log('Sidebar ')
    let content
    /* eslint-disable-react/prop-types */
    switch (role) {
        case 'admin':
            content = (
                <ul className="flex-1 px-3">
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 my-2 hover:bg-cyan-900 "
                            to="/main/registration"
                        >
                            Registratsiya
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/patients"
                        >
                            Bemorlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600  block rounded   p-2 px-4 my-2 hover:border-white "
                            to="/main/queue"
                        >
                            Navbatlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/investigations"
                        >
                            Tekshiruvlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/reports"
                        >
                            Hisobotlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/payments"
                        >
                            Tolov
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/doctors"
                        >
                            Shifokorlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/personnel"
                        >
                            Xodimlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/expenditures"
                        >
                            Chiqimlar
                        </NavLink>
                    </li>
                </ul>
            )
            break
        case 'doctor':
            content = (
                <ul className="flex-1 px-3">
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/patients"
                        >
                            Bemorlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/reports"
                        >
                            Hisobotlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/queue"
                        >
                            Navbatlar
                        </NavLink>
                    </li>
                </ul>
            )
            break
        case 'registration':
            content = (
                <ul className="flex-1 px-3">
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/registration"
                        >
                            Registratsiya
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/patients"
                        >
                            Bemorlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/queue"
                        >
                            Navbatlar
                        </NavLink>
                    </li>
                </ul>
            )
            break
        case 'investigator':
            content = (
                <ul className="flex-1 px-3">
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/investigations"
                        >
                            Tekshiruvlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/patients"
                        >
                            Bemorlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/queue"
                        >
                            Navbatlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/reports"
                        >
                            Hisobotlar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/templates"
                        >
                            Shablonlar
                        </NavLink>
                    </li>
                </ul>
            )
            break
        case 'cashier':
            content = (
                <ul className="flex-1 px-3">
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/payments"
                        >
                            To&apos;lov
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="border border-indigo-600 block rounded  p-2 px-4 my-2 hover:border-white "
                            to="/main/expenditures"
                        >
                            Chiqimlar
                        </NavLink>
                    </li>
                </ul>
            )
            break
        default:
            break
    }
    return (
        <aside
            className={`position: absolute top-0  bottom-0   md:static h-screen p-6   text-slate-100  font-bold bg-indigo-600 ${context.state ? 'left-0 right-0' : '-left-64'}`}
        >
            <Hamburger />
            <nav className="h-full  flex flex-col  shadow-sm">
                {content}
                <p className="text-center font-thin">
                    {' '}
                    &copy; Surxon IT Academy 2024
                </p>
            </nav>
        </aside>
    )
}

export default Sidebar

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Hamburger } from './hamburger'
import { AppContext } from '../context'

/* eslint-disable-next-line */
function Sidebar({ role }) {
    const context = useContext(AppContext)
    // console.log('Sidebar role', role)
    let content
    /* eslint-disable-react/prop-types */
    switch (role) {
        case 'admin':
            content = (
                <ul className="flex-1 px-3">
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/registration">
                            Registratsiya
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/patients">
                            Bemorlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/queue">
                            Navbatlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/investigations">
                            Tekshiruvlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/reports">
                            Hisobotlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/payments">
                            Tolov
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/doctors">
                            Shifokorlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/personnel">
                            Xodimlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/expenditures">
                            Chiqimlar
                        </Link>
                    </li>
                </ul>
            )
            break
        case 'doctor':
            content = (
                <ul className="flex-1 px-3">
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/patients">
                            Bemorlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/reports">
                            Hisobotlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/queue">
                            Navbatlar
                        </Link>
                    </li>
                </ul>
            )
            break
        case 'registration':
            content = (
                <ul className="flex-1 px-3">
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/registration">
                            Registratsiya
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/patients">
                            Bemorlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/queue">
                            Navbatlar
                        </Link>
                    </li>
                </ul>
            )
            break
        case 'investigator':
            content = (
                <ul className="flex-1 px-3">
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/investigations">
                            Tekshiruvlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/patients">
                            Bemorlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/queue">
                            Navbatlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/reports">
                            Hisobotlar
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/templates">
                            Shablonlar
                        </Link>
                    </li>
                </ul>
            )
            break
        case 'cashier':
            content = (
                <ul className="flex-1 px-3">
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/payments">
                            To&apos;lov
                        </Link>
                    </li>
                    <li className="rounded p-2 my-2 hover:bg-cyan-900 ">
                        <Link className="block" to="/main/expenditures">
                            Chiqimlar
                        </Link>
                    </li>
                </ul>
            )
            break
        default:
            break
    }
    return (
        <aside
            className={`position: absolute top-0  bottom-0  md:static h-screen p-6 shadow-inner  text-slate-100  font-bold bg-cyan-600 ${context.state ? 'left-0 right-0' : '-left-64'}`}
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

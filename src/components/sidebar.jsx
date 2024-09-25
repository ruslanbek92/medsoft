import React from 'react'
import { Link } from 'react-router-dom'
/* eslint-disable-next-line */
function Sidebar({ role }) {
    console.log('Sidebar')
    let content
    /* eslint-disable-react/prop-types */
    switch (role) {
        case 'admin':
            content = (
                <ul>
                    <li>
                        <Link to="/main/registration">Registratsiya</Link>
                    </li>
                    <li>
                        <Link to="/main/patients">Bemorlar</Link>
                    </li>
                    <li>
                        <Link to="/main/investigations">Tekshiruvlar</Link>
                    </li>
                    <li>
                        <Link to="/main/reports">Hisobotlar</Link>
                    </li>
                    <li>
                        <Link to="/main/payments">Tolov</Link>
                    </li>
                    <li>
                        <Link to="/main/doctors">Shifokorlar</Link>
                    </li>
                    <li>
                        <Link to="/main/personnel">Xodimlar</Link>
                    </li>
                </ul>
            )
            break
        case 'doctor':
            content = (
                <ul>
                    <li>
                        <Link to="/main/patients">Bemorlar</Link>
                    </li>
                    <li>
                        <Link to="/main/reports">Hisobotlar</Link>
                    </li>
                </ul>
            )
            break
        case 'registration':
            content = (
                <ul>
                    <li>
                        <Link to="/main/registration">Registratsiya</Link>
                    </li>
                    <li>
                        <Link to="/main/patients">Bemorlar</Link>
                    </li>
                </ul>
            )
            break
        case 'investigator':
            ;<ul>
                <li>
                    <Link to="/main/investigations">Tekshiruvlar</Link>
                </li>
            </ul>
            break
        case 'cashier':
            ;<ul>
                <li>
                    <Link to="/main/payments">Tolov</Link>
                </li>
            </ul>
            break
        default:
            break
    }
    return <aside className="sidebar">{content}</aside>
}

export default Sidebar

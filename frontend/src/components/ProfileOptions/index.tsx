import UserIcon from '@components/icons/UserIcon'
import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

interface ProfileOption {
    content?: string
    to: string
    action?: () => void
    icon?: ReactElement
}

function ProfileOptions() {
    const activeStyle = 'bg-triadic2 text-white rounded-lg'
    const isLinkActive = (isActive: boolean, content = '') => {
        return isActive ? activeStyle : ''
    }
    const profileOptions: ProfileOption[] = [
        {
            content: 'Personal',
            to: '/my-account',
            icon: <UserIcon />,
        },
        {
            content: 'Adresses',
            to: '/my-account/addresses',
            icon: <UserIcon />,
        },
        {
            content: 'Security',
            to: '/my-account/security',
            icon: <UserIcon />,
        },
        {
            content: 'Payment',
            to: '/my-account/payment',
            icon: <UserIcon />,
        },
        {
            content: 'Privacy',
            to: '/my-account/privacy',
            icon: <UserIcon />,
        },
    ]

    return (
        <ul className='flex flex-col gap-3 list-none text-secondary'>
            {profileOptions.map(({ content, to, icon }, index) => (
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        isLinkActive(isActive, content)
                    }
                >
                    <li
                        key={index}
                        className='flex items-center justify-between hover:bg-triadic1 hover:text-white  focus:font-bold p-2 rounded-lg group'
                    >
                        <span>{content}</span>
                        <span>{icon}</span>
                    </li>
                </NavLink>
            ))}
        </ul>
    )
}

export default ProfileOptions

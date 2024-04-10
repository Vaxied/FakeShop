import { NavLink } from 'react-router-dom'
function Navbar() {
    const activeStyle = 'underline underline-offset-4'
    const isLinkActive = (isActive) => {
        return isActive ? activeStyle : ''
    }
    return (
        <>
            <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
                <ul className='flex items-center gap-3'>
                    <li className='font-semibold text-lg'>
                        <NavLink to='/'>Shopi</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/clothes'
                            className={({ isActive }) => isLinkActive(isActive)}
                        >
                            Clothes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/furnitures'
                            className={({ isActive }) => isLinkActive(isActive)}
                        >
                            Furnitures
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/electronics'
                            className={({ isActive }) => isLinkActive(isActive)}
                        >
                            Electronics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/toys'
                            className={({ isActive }) => isLinkActive(isActive)}
                        >
                            Toys
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='others'
                            className={({ isActive }) => isLinkActive(isActive)}
                        >
                            Others
                        </NavLink>
                    </li>
                </ul>
                <ul className='flex items-center gap-3'>
                    <li className='text-black/80'>Whatever@platzi.com</li>
                    <li>
                        <NavLink
                            to='/my-orders'
                            className={({ isActive }) => isLinkActive(isActive)}
                        >
                            My Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/my-account'
                            className={({ isActive }) => isLinkActive(isActive)}
                        >
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/sign-in'
                            className={({ isActive }) => isLinkActive(isActive)}
                        >
                            Sign In
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/my-order'>🛒0</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar

import './index.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='w-full flex flex-wrap relative justify-center items-center h-[350px] bg-black'>
            <div className='flex justify-between w-[500px] text-white'>
                <div>
                    <p className='text-lg relative py-2 after:content-[""] border-b-white'>
                        <span className='after:content-[""] absolute border-b-2 border-b-white w-[35px] h-1 block bottom-0' />
                        Company{''}
                    </p>
                    <ul className='py-2'>
                        <li>
                            <Link to={'/'}>About Us</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link to={'/'}>Our Affiliate Program</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className='text-lg relative py-2 after:content-[""] border-b-white'>
                        <span className='after:content-[""] absolute border-b-2 border-b-white w-[35px] h-1 block bottom-0' />
                        Get Help{' '}
                    </p>
                    <div>
                        <ul className='py-2'>
                            <li>
                                <Link to={'/'}>FAQ</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Shipping</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Returns</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Payment Options</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full absolute bottom-4 flex justify-center'>
                <p className='text-white text-sm'>
                    2024 Copyright FakeShop. All Rights Reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer

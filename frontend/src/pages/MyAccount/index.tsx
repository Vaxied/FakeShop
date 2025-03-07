import { StoreContextType } from '@@types/store'
import PrimaryContainer from '@components/common/containers/PrimaryContainer'
import { StoreContext } from '@components/Context/context'
import ProfileOptions from '@components/ProfileOptions'
import React from 'react'

function MyAccount() {
    const fieldStyle =
        'bg-white border border-gray-500 rounded-lg py-2 px-4 w-full'
    return (
        <div className='w-full flex gap-8'>
            <div className='w-1/3'>
                <PrimaryContainer paddingSize='sm'>
                    <ProfileOptions />
                </PrimaryContainer>
            </div>
            <div className='w-2/3'>
                <PrimaryContainer>
                    <div className='grid grid-cols-6 gap-4'>
                        <div className='col-span-3'>
                            <label htmlFor='' className='block px-2 pb-2'>
                                Firstname
                            </label>
                            <div className={fieldStyle}>Firstname</div>
                        </div>
                        <div className='col-span-3'>
                            <label htmlFor='' className='block px-2 pb-2'>
                                Firstname
                            </label>
                            <div className={fieldStyle}>Lastname</div>
                        </div>
                        <div className='col-span-4'>
                            <label htmlFor='' className='block px-2 pb-2'>
                                Firstname
                            </label>
                            <div className={fieldStyle}>Email</div>
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor='' className='block px-2 pb-2'>
                                Firstname
                            </label>

                            <div className={fieldStyle}>Phone</div>
                        </div>
                    </div>
                </PrimaryContainer>
            </div>
        </div>
    )
}

export default MyAccount

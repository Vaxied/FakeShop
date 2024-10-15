import Spinner from '../Spinner'

function Loader() {
    return (
        <div className='flex w-full h-full justify-center items-center fixed top-16 bottom-0 bg-white z-10 overflow-hidden'>
            <Spinner size={'4'} />
        </div>
    )
}

export default Loader

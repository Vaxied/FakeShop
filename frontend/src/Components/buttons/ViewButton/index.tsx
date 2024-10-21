import { useNavigate } from 'react-router-dom'

function ViewButton({ id }: Readonly<{ id: string }>) {
    const navigate = useNavigate()
    return (
        <button
            type='button'
            className='h-8 py-2 px-4 bg-secondary text-white rounded-lg flex justify-center items-center'
            onClick={() => navigate(`${id}`)}
        >
            View
        </button>
    )
}

export default ViewButton

import { useNavigate } from 'react-router-dom'
interface Props {
    subject: any
}

function ViewButton({ id }: Readonly<{ id: string }>) {
    const navigate = useNavigate()
    return (
        <button
            type='button'
            className='ml-8 h-8 py-2 px-4 bg-gray-500 text-white rounded-lg flex justify-center items-center'
            onClick={() => navigate(`${id}`)}
        >
            View
        </button>
    )
}

export default ViewButton

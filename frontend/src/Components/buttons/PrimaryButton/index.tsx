import { useNavigate } from 'react-router-dom'

function ActionButton(
    props: Readonly<{
        text: string
        type: 'submit' | 'reset' | 'button' | undefined
        action: (() => void) | undefined
        route: string | undefined
    }>
) {
    const handleAction = () => {
        if (!action && route) {
            navigate(route)
        } else if (action) action()
    }

    const navigate = useNavigate()
    const { text, type, action, route } = props
    return (
        <button
            className={`border border-gray px-4 py-2 w-[--action-btn-width] bg-black
                    text-white rounded-lg`}
            type={type}
            onClick={() => handleAction()}
        >
            {text}
        </button>
    )
}

export default ActionButton

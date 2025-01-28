import { useNavigate } from 'react-router-dom'
type ActionButtonProps = {
    text: string
    type: 'submit' | 'reset' | 'button' | undefined
    action?: () => void
    route?: string
    max?: boolean
}
function ActionButton(props: ActionButtonProps) {
    const {
        text,
        type,
        action = undefined,
        route = undefined,
        max = false,
    } = props
    const handleAction = () => {
        if (!action && route) {
            navigate(route)
        } else if (action) action()
    }

    const navigate = useNavigate()
    return (
        <button
            className={`w-full h-10 border border-gray px-4 py-2 ${max ? 'max-w-56' : ''} bg-secondary
                    text-white rounded-lg`}
            type={type}
            onClick={() => handleAction()}
        >
            {text}
        </button>
    )
}

export default ActionButton

import { useNavigate } from 'react-router-dom'
type ActionButtonProps = {
    type?: 'submit' | 'reset' | 'button'
    action?: () => void
    text?: string
    route?: string
    max?: boolean
    children?: React.ReactNode
}
function ActionButton(props: ActionButtonProps) {
    const {
        text = '',
        type = 'button',
        action = undefined,
        route = undefined,
        max = false,
        children,
    } = props
    const handleAction = () => {
        if (!action && route) {
            navigate(route)
        } else if (action) action()
    }

    const navigate = useNavigate()
    return (
        <button
            className={`w-full md:${max ? 'max-w-56' : 'w-fit'} h-10 border border-gray px-4 py-2 bg-secondary
                    text-white rounded-lg`}
            type={type}
            onClick={() => handleAction()}
        >
            {text && children && (
                <p className='flex gap-x-2'>
                    <span>{text}</span>
                    <span>{children}</span>
                </p>
            )}
            {text && !children && <span>{text}</span>}
            {!text && children && <span>{children}</span>}
        </button>
    )
}

export default ActionButton

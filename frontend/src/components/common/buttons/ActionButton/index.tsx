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
            className={`w-full flex items-center justify-center min-w-36 ${max ? 'md:w-full' : 'md:w-fit'} h-10 border border-gray px-8 py-4 bg-secondary
                    text-white rounded-full hover:bg-accent hover:border-secondary`}
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

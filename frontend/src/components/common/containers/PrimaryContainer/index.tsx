type props = {
    paddingSize?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
    children: React.ReactNode
}

function PrimaryContainer({ children, paddingSize = 'lg' }: Readonly<props>) {
    const containerPaddingSizes = {
        none: 'md:px-0 md:py-0',
        sm: 'md:px-4 md:py-3',
        md: 'md:px-6 md:py-4',
        lg: 'md:px-8 md:py-6',
        xl: 'md:px-10 md:py-8',
    }

    return (
        <div
            className={`w-full border border-gray p-3 rounded-lg bg-container ${containerPaddingSizes[paddingSize]}`}
        >
            {children}
        </div>
    )
}

export default PrimaryContainer

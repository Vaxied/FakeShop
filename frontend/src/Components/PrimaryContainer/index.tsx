type props = { children: React.ReactNode }
function PrimaryContainer({ children }: Readonly<props>) {
    return (
        <div className='min-w-full flex-col border border-gray px-6 py-4 rounded-lg bg-gray-100'>
            {children}
        </div>
    )
}

export default PrimaryContainer

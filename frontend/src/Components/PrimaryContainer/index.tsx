type props = { children: React.ReactNode }
function PrimaryContainer({ children }: Readonly<props>) {
    return (
        <div className='w-full flex flex-col'>
            <div className='border border-gray px-6 py-4 rounded-lg bg-gray-100'>
                {children}
            </div>
        </div>
    )
}

export default PrimaryContainer

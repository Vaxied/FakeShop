type props = { children: React.ReactNode }

function MainContainer({ children }: Readonly<props>) {
    return (
        <div className='w-full flex justify-center p-8 min-h-[calc(100vh-70px)]'>
            {children}
        </div>
    )
}

export default MainContainer

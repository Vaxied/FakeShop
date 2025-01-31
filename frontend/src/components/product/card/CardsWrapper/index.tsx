// import PropTypes from 'prop-types'

type props = {
    children: React.ReactNode
}
function CardsWrapper({ children }: props) {
    // CardsWrapper.propTypes = {
    //     children: PropTypes.array.isRequired,
    // }

    const cardContainerWidths = {
        // the formula goes 240px for each card * times the number of cards - 1 (for the gap)
        lg: 'lg:w-[calc(240*4px+48px)]',
        md: 'md:w-[calc(240*3px+32px)]',
        sm: 'w-[calc(240*2px+16px)]',
    }
    return (
        <div
            className={`flex gap-4 flex-wrap justify-start xs:w-full ${cardContainerWidths.lg} ${cardContainerWidths.md} ${cardContainerWidths.sm}`}
        >
            {children}
        </div>
    )
}

export default CardsWrapper

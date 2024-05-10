import PropTypes from 'prop-types'
function CardsWrapper({ children }) {
    CardsWrapper.propTypes = {
        children: PropTypes.array.isRequired,
    }
    return (
        <div className='lg:w-[calc(224*4px+48px)] md:w-[calc(224*3px+32px)] w-[calc(224*2px+16px)] flex gap-4 flex-wrap justify-start '>
            {children}
        </div>
    )
}

export default CardsWrapper

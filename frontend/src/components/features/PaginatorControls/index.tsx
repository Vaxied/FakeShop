import ArrowIcon from '@components/icons/ArrowIcon'

type PaginatorControlsProps = {
    updatePage: (page: number) => void
    currentPage: number
    adyacentPages?: number[]
    pagesArr: number[]
    totalPages: number
    firstLoad?: boolean
    setFirstLoad: (state: boolean) => void
    scrollToTopOfContent: () => void
}

function PaginatorControls(props: Readonly<PaginatorControlsProps>) {
    const {
        updatePage,
        currentPage,
        adyacentPages,
        pagesArr,
        totalPages,
        firstLoad,
        setFirstLoad
    } = props

    const isCloserToBeginning = () => {
        const distanceToBeginning = currentPage - 1
        const distanceToEnd = totalPages - currentPage
        console.log('DB', distanceToBeginning, 'DE', distanceToEnd)
        // Edge case when final page appears in adyacentPages
        if (
            distanceToBeginning <= distanceToEnd &&
            adyacentPages?.includes(totalPages)
        )
            return false
        return distanceToBeginning <= distanceToEnd
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            updatePageAndFirstLoadState(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            updatePageAndFirstLoadState(currentPage - 1)
        }
    }

    const turnOffFirstLoad = () => {
        if (!firstLoad) return
        setFirstLoad(false)
    }

    const updatePageAndFirstLoadState = (page: number) => {
        updatePage(page)
        turnOffFirstLoad()
    }

    return (
        <div className="flex justify-center gap-2">
            <button
                className={`flex justify-center py-2 bg-accent rounded-lg w-12 disabled:bg-gray-400`}
                onClick={() => prevPage()}
                disabled={currentPage === 1}
            >
                <ArrowIcon />
            </button>
            {!adyacentPages?.includes(1) && !isCloserToBeginning() && (
                <div className="flex left-indicator gap-2">
                    <button
                        className={`px-4 py-2 bg-accent rounded-lg w-12 ${currentPage === 1 ? 'text-white bg-primary' : 'text-white bg-secondary'}`}
                        onClick={() => {
                            updatePageAndFirstLoadState(1)
                        }}
                    >
                        <span>1</span>
                    </button>
                    <span className="flex justify-center items-end w-12 tracking-wide text-accent text-3xl leading-none">
                        ...
                    </span>
                </div>
            )}
            {pagesArr.length > 1 &&
                adyacentPages?.map(page => (
                    <button
                        className={`px-4 py-2 bg-accent rounded-lg w-12 ${currentPage === page ? 'text-white bg-primary' : 'text-white bg-secondary'}`}
                        onClick={() => {
                            updatePageAndFirstLoadState(page)
                        }}
                    >
                        <span key={page} className="w-4">
                            {page}
                        </span>
                    </button>
                ))}
            {!adyacentPages?.includes(totalPages) && isCloserToBeginning() && (
                <div className="flex right-indicator gap-2">
                    <span className="flex justify-center items-end w-12 tracking-wide text-accent text-3xl leading-none">
                        ...
                    </span>
                    <button
                        className={`px-4 py-2 bg-accent rounded-lg w-12 ${currentPage === totalPages ? 'text-white bg-primary' : 'text-white bg-secondary'}`}
                        onClick={() => {
                            updatePageAndFirstLoadState(totalPages)
                        }}
                    >
                        <span>{totalPages}</span>
                    </button>
                </div>
            )}

            <button
                className="flex justify-center py-2 bg-accent rounded-lg w-12 disabled:bg-gray-400"
                onClick={() => nextPage()}
                disabled={currentPage === totalPages}
            >
                <ArrowIcon deg="180" />
            </button>
        </div>
    )
}

export default PaginatorControls

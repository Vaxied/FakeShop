import { ReactNode, useState, useRef, useEffect } from 'react'
import Spinner from '../loading/Spinner'
import PaginatorControls from '../PaginatorControls'

type PaginatorProps = {
    render: (content: any) => ReactNode
    elementsPerPage: number
    content: any
    scrollToTopOfReviews: () => void
    resourceToFilter?: number
    shouldResetPaginator?: boolean
    setShouldResetPaginator?: (state: boolean) => void
    firstLoad: boolean
    setFirstLoad: (state: boolean) => void
}

function Paginator(props: Readonly<PaginatorProps>) {
    const [currentPage, setCurrentPage] = useState(1)
    const {
        render,
        content,
        elementsPerPage,
        scrollToTopOfReviews,
        resourceToFilter,
        shouldResetPaginator,
        setShouldResetPaginator,
        firstLoad,
        setFirstLoad
    } = props
    const [adyacentPages, setAdjyacentPages] = useState([1, 2, 3])
    const pagesArr = useRef<number[]>([1])
    const [isLoading, setIsLoading] = useState(true)
    console.log(content)

    const totalPages = Math.ceil(content.length / elementsPerPage)

    const buildPagesArr = () => {
        for (let i = 2; i <= totalPages; i++) {
            pagesArr.current.push(i)
        }
        console.log('pagesArr', pagesArr.current)
    }

    const updatePage = (page: number) => {
        setIsLoading(true)
        if (currentPage === page) {
            console.log('samePage')
            return
        }
        setCurrentPage(page)
    }

    const resetPaginator = () => {
        updatePage(1)
        setAdjyacentPages([1, 2, 3])
    }

    useEffect(() => {
        if (shouldResetPaginator && setShouldResetPaginator) {
            resetPaginator()
            setShouldResetPaginator(false)
            return
        }
        updateAdyacentPages(currentPage)
        if (isLoading) setTimeout(() => setIsLoading(false), 1000)
        if (!firstLoad) {
            console.log('scrolling to reviews')
            scrollToTopOfReviews()
            return
        }
    }, [currentPage, isLoading, resourceToFilter, firstLoad])

    const updateAdyacentPages = (page: number) => {
        console.log('totalpages', totalPages)
        console.log('this is page', page)
        if (page === 1) {
            console.log('checking if less')
            setAdjyacentPages([1, 2, 3])
            return
        } else if (page + 2 >= totalPages || page + 1 >= totalPages) {
            console.log('checking if more')
            setAdjyacentPages([totalPages - 2, totalPages - 1, totalPages])
        } else {
            console.log('just updating')
            setAdjyacentPages([page, page + 1, page + 2])
        }
    }
    console.log('content', content)

    const getPagedData = (items: any) => {
        if (content.length > elementsPerPage && pagesArr.current.length === 1) {
            buildPagesArr()
        }
        console.log('currentPage', currentPage)
        const start = (currentPage - 1) * elementsPerPage
        const end = start + elementsPerPage
        console.log(start, end)
        return items.slice(start, end)
    }

    const showPaginatorControls = () => {
        return content.length > elementsPerPage
    }
    console.log(getPagedData(content))
    if (!content.length) {
        return (
            <p className="text-center font-medium text-lg">
                No reviews at the moment
            </p>
        )
    }

    return (
        <div id="paginator" className="flex flex-col justify-between">
            <div className="min-h-[70vh] h-full">
                {isLoading ? (
                    <div className="flex h-[70vh] items-center w-full">
                        <Spinner size="8" />
                    </div>
                ) : (
                    <div>{render(getPagedData(content))}</div>
                )}
            </div>
            {showPaginatorControls() && (
                <PaginatorControls
                    currentPage={currentPage}
                    updatePage={updatePage}
                    pagesArr={pagesArr.current}
                    adyacentPages={adyacentPages}
                    setIsCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    scrollToTopOfReviews={scrollToTopOfReviews}
                    firstLoad={firstLoad}
                    setFirstLoad={setFirstLoad}
                />
            )}
        </div>
    )
}

export default Paginator

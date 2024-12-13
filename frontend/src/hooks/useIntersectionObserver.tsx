import { useRef } from 'react'

type ObserverOptions = {
    root: HTMLElement | null
    rootMargin: string
    threshold: number
}

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void

const useIntersectionObserver = (
    callback: ObserverCallback,
    options: ObserverOptions
) => {
    const observer = useRef<IntersectionObserver | null>(
        new IntersectionObserver(callback, options)
    )

    const disconnect = () => {
        if (observer.current) observer.current.disconnect()
    }

    const observe = (element: any) => {
        if (element) {
            observer.current?.observe(element)
        }
    }
    const unobserve = (element: any) => {
        if (element) {
            observer.current?.unobserve(element)
        }
    }
    return { observe, unobserve, disconnect }
}

export default useIntersectionObserver

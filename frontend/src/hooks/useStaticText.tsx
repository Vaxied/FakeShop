import React from 'react'
import ContentItemTypeClass from '@classes/ContentItemClass'
import { ContentItemType } from '@@types/contentItem'

//This custom hook logic could be transfered to StaticText component
function useStaticText(responseText: string) {
    const [textArr, setTextArr] = React.useState<string[]>([])

    const formattedArr = React.useRef<ContentItemType[]>([])

    const isTitle = (text: string, index: number) =>
        !text.includes('.') && !text.includes(':') && index === 0

    const isSubtitle = (text: string, index: number) =>
        !text.includes('.') &&
        !text.includes(':') &&
        index !== 0 &&
        index !== textArr.length - 1

    const isUnorderedList = (text: string) =>
        !text.includes('.') && text.includes(':')

    const isParagraph = (text: string) =>
        ((!text.includes(':') && text.includes('.')) ||
            (text.includes('.') && text.includes(':'))) &&
        !text.includes('•')

    const isListItem = (text: string) => text.includes('•')

    const isLastContent = (lastIndex: number | null, index: number) => {
        return index === lastIndex
    }
    const buildContentArr = (arr: string[]) => {
        let segment = new ContentItemTypeClass(0)
        arr.forEach((element, index) => {
            switch (true) {
                case isTitle(element, index):
                    console.log('is title')
                    segment.title = element
                    break
                case isSubtitle(element, index):
                    console.log('is subtitle')
                    if (segment.subtitle || segment.title) {
                        formattedArr.current.push(segment)
                        segment = createContentItemType(
                            formattedArr.current.length
                        )
                    }
                    if (!segment.title) segment.subtitle = element
                    break
                case index === arr.length - 1:
                    console.log('is last')
                    segment.content.push(element)
                    segment = createContentItemType(formattedArr.current.length)
                    formattedArr.current.push(segment)
                    break
                default:
                    segment.content.push(element)
                    break
            }
            console.log('formattedArr current', formattedArr.current)
        })
    }
    const createContentItemType = (index: number) => {
        const item = new ContentItemTypeClass(index)
        return item
    }
    const styles = {
        title: 'font-bold text-lg pb-4',
        subtitle: 'text-sm font-bold pt-2 pb-2',
        list: {
            unorderedList: {
                default: 'pb-2 text-xs',
                listItem: 'pl-4 text-xs',
            },
        },
        paragraph: 'text-xs',
        default: 'text-xs',
    }

    if (!textArr.length && responseText) {
        console.log('setting up policy')
        setTextArr(() => responseText.split(/\r\n|\n/))
    }

    if (responseText && textArr.length && !formattedArr.current.length) {
        console.log('building ARRAY')
        buildContentArr(textArr)
    }

    console.log('RENDERING')
    console.log('formatted', formattedArr.current)
    const styleText = (
        text: string,
        index: number,
        lastIndex: number | null = null
    ) => {
        let style
        switch (true) {
            case isTitle(text, index):
                style = styles.title
                break
            case isSubtitle(text, index):
                style = styles.subtitle
                break
            case isUnorderedList(text):
                style = styles.list.unorderedList.default
                break
            case isParagraph(text):
                style = styles.paragraph
                if (!isLastContent(lastIndex, index)) style = `${style} pb-1`
                break
            case isListItem(text):
                style = styles.list.unorderedList.listItem
                if (!isLastContent(lastIndex, index)) style = `${style} pb-1`
                break
            default:
                style = styles.default
                break
        }
        return style
    }
    return { styleText, textArr, formattedArr }
}

export default useStaticText

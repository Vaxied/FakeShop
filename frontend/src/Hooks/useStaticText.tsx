import React from 'react'

//This custom hook logic could be transfered to StaticText component
function useStaticText(responseText: string) {
    const [textArr, setTextArr] = React.useState<string[]>([])
    // console.log('textArr', textArr)

    if (!textArr.length && responseText) {
        console.log('setting up policy')
        setTextArr(() => responseText.split(/\r\n|\n/))
    }

    const isTitle = (text: string, index: number) =>
        !text.includes('.') && !text.includes(':') && index === 0

    const isSubtitle = (text: string, index: number) =>
        !text.includes('.') &&
        !text.includes(':') &&
        index !== 0 &&
        index !== textArr.length - 1

    const isUnorderedList = (text: string) =>
        !text.includes('.') && text.includes(':')

    const isParagraph = (text: string, index: number) =>
        (!text.includes(':') && text.includes('.')) ||
        (text.includes('.') &&
            text.includes(':') &&
            !isFollowedByTitleOrSubtitle(index))

    const isListItem = (text: string) => text.includes('•')

    const isFollowedByTitleOrSubtitle = (index: number) => {
        if (index < textArr.length - 1) {
            return (
                isTitle(textArr[index + 1], index + 1) ||
                isSubtitle(textArr[index + 1], index + 1)
            )
        }
        return false
    }

    const styles = {
        title: 'font-bold text-lg pb-4',
        subtitle: 'text-sm font-bold pt-2 pb-2',
        list: { unorderedList: { default: 'pb-2 text-xs', listItem: 'pl-4' } },
        paragraph: 'pb-1 text-xs',
        default: 'text-xs',
    }

    const styleText = (text: string, index: number) => {
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
            case isParagraph(text, index):
                style = styles.paragraph
                break
            case isListItem(text):
                style = styles.list.unorderedList.listItem
                break
            default:
                style = styles.default
                break
        }
        return style
    }
    return { styleText, textArr }
}

export default useStaticText

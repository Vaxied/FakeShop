import React from 'react'
import { StoreContext } from '../../Context/context'
import { StoreContextType } from '../../@types/store'
function Privacy() {
    const { policy } = React.useContext(StoreContext) as StoreContextType

    const [textArr, setTextArr] = React.useState<string[]>([])
    console.log('policy', policy)
    console.log('textArr', textArr)

    if (!textArr.length && policy) {
        console.log('setting up policy')
        setTextArr(() => policy.split(/\r\n|\n/))
    }

    const isTitle = (text: string, index: number) =>
        !text.includes('.') && !text.includes(':') && index === 0

    const isSubtitle = (text: string, index: number) =>
        !text.includes('.') && !text.includes(':') && index !== 0

    const isUnorderedList = (text: string) =>
        !text.includes('.') && text.includes(':')

    const isParagraph = (text: string) =>
        (!text.includes(':') && text.includes('.')) ||
        (text.includes('.') && text.includes(':'))

    const isListItem = (text: string) => text.includes('•')

    const styles = {
        title: 'font-bold text-lg pb-4',
        subtitle: 'text-sm font-bold pt-2 pb-2',
        list: { unorderedList: { default: 'pb-2 text-xs', listItem: 'pl-4' } },
        paragraph: 'pb-1 text-xs',
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
            case isParagraph(text):
                style = styles.paragraph
                break
            case isListItem(text):
                style = styles.list.unorderedList.listItem
                break
            default:
                style = ''
                break
        }
        return style
    }

    return (
        <div className='max-w-[1200px] pr-[25%] pl-[10%]'>
            {textArr.map((text: string, index: number) => (
                <p className={styleText(text, index)}>{text}</p>
            ))}
        </div>
    )
}

export default Privacy

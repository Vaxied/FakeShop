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

    const isTitle = (text: string) => !text.includes('.') && !text.includes(':')

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
    return (
        <div className='max-w-[1200px] pr-[25%] pl-[10%]'>
            {textArr.map((text: string, index: number) => (
                <p
                    className={`
                        ${isTitle(text) && index === 0 ? styles.title : ''}
                    ${isTitle(text) && index !== 0 ? styles.subtitle : ''}
                    ${
                        isUnorderedList(text)
                            ? styles.list.unorderedList.default
                            : ''
                    }
                        ${isParagraph(text) ? styles.paragraph : ''}
                        ${
                            isListItem(text)
                                ? styles.list.unorderedList.listItem
                                : ''
                        }
                        `}
                >
                    {text}
                </p>
            ))}
        </div>
    )
}

export default Privacy

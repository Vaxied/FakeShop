import React from 'react'
import { ContentItemType } from '../../../../@types/contentItem'
import useStaticText from '../../../../Hooks/useStaticText'

function StaticText(props: Readonly<{ responseText: string }>) {
    const { responseText } = props
    const { styleText, textArr, formattedArr } = useStaticText(responseText)
    const [contentArr, setContentArr] = React.useState<ContentItemType[]>([])

    console.log('formattedARRRRRRRR', formattedArr.current)
    console.log('contentARRRR', contentArr)

    if (responseText && textArr.length && !contentArr.length) {
        setContentArr(() => formattedArr.current)
        console.log('setted contentarr')
        //     return (
        //         <>
        //             {textArr.map((text, index) => (
        //                 <p key={index} className={styleText(text, index)}>
        //                     {text}
        //                 </p>
        //             ))}
        //         </>
        //     )
    }

    if (responseText && contentArr.length && textArr.length) {
        return (
            <>
                {contentArr.map((text, index) => {
                    return [
                        text.title ? (
                            <p
                                key={`segment-title-${text.id}`}
                                className={styleText(text.title, index)}
                                id={`segment-${text.id}-title`}
                            >
                                {text.title}
                            </p>
                        ) : null,
                        text.subtitle ? (
                            <p
                                key={`segment-subtitle-${text.id}`}
                                className={styleText(text.subtitle, index)}
                                id={`segment-${text.id}-subtitle`}
                            >
                                {text.subtitle}
                            </p>
                        ) : null,

                        text.content.length
                            ? text.content.map((item, contentIndex) => (
                                  <p
                                      key={`segment-${text.id}--content-${contentIndex}`}
                                      className={styleText(
                                          item,
                                          contentIndex,
                                          text.content.length - 1
                                      )}
                                      id={`segment-${text.id}--content-${contentIndex}`}
                                  >
                                      {item}
                                  </p>
                              ))
                            : null,
                    ]
                })}
            </>
        )
    }
}

export default StaticText

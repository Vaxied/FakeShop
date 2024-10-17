class ContentItemClass {
    id: number
    title: string | null
    subtitle: string | null
    content: string[]

    constructor(
        id: number,
        title: string | null = null,
        subtitle: string | null = null,
        content: string[] = []
    ) {
        this.id = id
        this.title = title
        this.subtitle = subtitle
        this.content = content
    }
}

export default ContentItemClass

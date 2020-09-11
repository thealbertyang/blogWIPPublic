const marksMap = ({ type }) => {
    switch (type) {
        case 'code':
            return (children) => (
                <pre>
                    {children}
                </pre>
            )
        case 'underline':
            return (children) => (
                <u>
                    {children}
                </u>
            )
        case 'italic':
            return (children) => (
                <i>
                    {children}
                </i>
            )
        case 'bold':
            return (children) => (
                <b>
                    {children}
                </b>
            )
        default:
            return (children) => children
    }
}

export const parseMarks = ({ value, marks, ...content }) => {
    return marks && marks.reduce((acc, mark) => {
        return marksMap(mark)(acc)
    }, value)
}

const nodeMap = ({ nodeType, data, marks }) => {
    switch (nodeType) {
        case 'paragraph':
            return (children) => (
                <p>
                    {children}
                </p>
            )
        case 'text':
            return (children) => (
                <span>
                    {children}
                </span>
            )
        case 'hyperlink':
            return (children) => (
                <a href={data.uri}>
                    {children}
                </a>
            )
        case 'heading-1':
            return (children) => (
                <h1>
                    {children}
                </h1>
            )
        default:
            return (children) => (
                <>
                    {children}
                </>
            )
    }
}

export function parseBody({ content, format = 'html' }) {
    return content?.content.map((content) => {
        return nodeMap(
                    format === 'html' ? 
                        content 
                    : 
                        nodeMap({ ...content, nodeType: 'plainText' })
                )(
                    content.content ? 
                        parseBody({ content, format }) 
                    : 
                        format === 'html' ? 
                            parseMarks(content)
                        :
                            content.value
                )
    })
}
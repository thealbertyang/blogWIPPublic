import { useQuery, gql } from '@apollo/client';

const BLOG_POSTS_QUERY = gql`
    query {
        blogPostCollection(limit: 20) {
            items {
                slug
                author {
                    ... on Author {
                        firstName
                        lastName
                    }
                }
                dateTime
                title
                body {
                    json
                }
            }
        }
    }
`;

const marksMap = ({ type }) => {
  switch(type) {
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

const parseMarks = ({ value, marks, ...content }) => {
  return marks && marks.reduce((acc, mark) => {
    return marksMap(mark)(acc)
  }, value)
}

const nodeMap = ({ nodeType, data, marks }) => {
  switch(nodeType) {
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

function parseBody(content) {
    return content.content && content.content.map((content) => {
        return nodeMap(content)(
            content.content ? parseBody(content) : parseMarks(content)
        )
    })
}

function Posts() {
    const { loading, error, data } = useQuery(BLOG_POSTS_QUERY);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.blogPostCollection.items.map(({ slug, body }) => (
      <div key={slug}>
        <p>
          slug: {slug}
        </p>
        <p>
          content: <pre>{JSON.stringify(body, 0, 2)}</pre>
        </p>
        <div>
            {parseBody(body.json)}
        </div>
      </div>
    ));
}

export default Posts;
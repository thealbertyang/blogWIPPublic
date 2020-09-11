import { useQuery, gql } from '@apollo/client';
import { parseBody } from '../../services/contentful/parser';

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

function Posts() {
    const { loading, error, data } = useQuery(BLOG_POSTS_QUERY);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.blogPostCollection.items.map(({ slug, title, body }) => {
      const content = parseBody({
        content: body.json,
        format: 'text',
        limit: 300
      });
      return (
        <a href={`/post/${slug}`} key={slug}>
          <div>
            <h1>
              {title}
            </h1>
            <p>
              {content}
            </p>
          </div>
        </a>
      )
    });
}

export default Posts;
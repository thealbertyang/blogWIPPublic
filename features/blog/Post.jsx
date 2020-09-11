import { useQuery, gql } from '@apollo/client';
import { parseBody } from '../../services/contentful/parser';

const BLOG_POST_QUERY = gql`
    query($slug: String = "hello") {
        blogPostCollection(where: { slug: $slug }) {
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

function Post({ slug }) {
    const { loading, error, data } = useQuery(BLOG_POST_QUERY, {
        variables: { slug },
    });
  
    console.log('data', data);
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

export default Post;
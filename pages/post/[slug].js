import Post from "../../features/blog/Post"

import { useRouter } from 'next/router'

function Page() {
    const router = useRouter()
    const { slug } = router.query

    return (
        <Post
            slug={slug}
        />
    )
}
  
export default Page
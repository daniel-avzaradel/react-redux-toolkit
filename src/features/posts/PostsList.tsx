import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import { PostArticle, PostsSection, RenderedPosts } from "./posts.module";
import { selectAllPosts } from "./postSlice";
import TimeAgo from "./TimeAgo";

const PostsList = () => {

    const posts = useSelector(selectAllPosts)

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <PostArticle key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 120)}</p>
            <br />
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
        </PostArticle>
    ))

    return (
        <PostsSection>
            <h2>Posts</h2>
            <RenderedPosts>
                {renderedPosts}
            </RenderedPosts>
        </PostsSection>
    )
}
export default PostsList
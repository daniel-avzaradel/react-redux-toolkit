import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import { selectAllPosts } from "./postSlice";
import { PostArticle, PostsSection } from "./posts.module";

const PostsList = () => {

    const posts = useSelector(selectAllPosts)

    const renderedPosts = posts.map(post => (
        <PostArticle key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
            </p>
        </PostArticle>
    ))

    return (
        <PostsSection>
            <h2>Posts</h2>
            {renderedPosts}
        </PostsSection>
    )
}
export default PostsList
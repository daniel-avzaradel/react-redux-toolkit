import { useDispatch, useSelector } from "react-redux";
import { PostArticle, PostsSection, RenderedPosts } from "./posts.module";
import { selectAllPosts, selectError, selectStatus } from "./postSlice";

import TimeAgo from "./TimeAgo";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import { AppDispatch } from "../../app/store";

const PostsList = () => {

    const dispatch = useDispatch<AppDispatch>();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(selectStatus);
    const error = useSelector(selectError);

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
            <br />
            <ReactionButtons post={post} />
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
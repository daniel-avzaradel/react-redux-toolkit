import { useDispatch, useSelector } from "react-redux";
import { PostsSection, RenderedPosts } from "./posts.module";
import { fetchPosts, selectAllPosts, selectStatus } from "./postSlice";

import { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {

    const dispatch = useDispatch<AppDispatch>();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(selectStatus);

    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map((post, i) => (
        <PostsExcerpt post={post} key={post.id + i} />
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
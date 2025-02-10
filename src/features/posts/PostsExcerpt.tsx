import PostAuthor from "./PostAuthor"
import { PostArticle } from "./posts.module"
import { PostsState } from "./postSlice"
import ReactionButtons from "./ReactionButtons"
import TimeAgo from "./TimeAgo"

import { Link } from "react-router-dom"

interface PostsExcerptProps {
  post: PostsState
}

const PostsExcerpt = ({ post }: PostsExcerptProps) => {
  return (
    <PostArticle>
      <h3>{post.title.substring(0, 40)}</h3>
      <p>{post.body.substring(0, 75)}</p>
      <br />
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <br />
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <br />
      <ReactionButtons post={post} />
    </PostArticle>
  )
}

export default PostsExcerpt
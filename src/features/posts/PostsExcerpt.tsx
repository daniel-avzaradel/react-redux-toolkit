import PostAuthor from "./PostAuthor"
import { PostArticle } from "./posts.module"
import { PostsState } from "./postSlice"
import ReactionButtons from "./ReactionButtons"
import TimeAgo from "./TimeAgo"

interface PostsExcerptProps {
  post: PostsState
}

const PostsExcerpt = ({ post }: PostsExcerptProps) => {
  return (
    <PostArticle>
      <h3>{post.title.substring(0, 40)}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <br />
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <br />
      <ReactionButtons post={post} />
    </PostArticle>
  )
}

export default PostsExcerpt
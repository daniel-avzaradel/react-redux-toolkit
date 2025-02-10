import { useSelector } from "react-redux"
import { selectPostById } from "./postSlice"
import { RootStore } from "../../app/store"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"

const SinglePostPage = () => {

  // retrieve postId

  const post = useSelector((state: RootStore) => selectPostById(state, ''))

  if(!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return(
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePostPage
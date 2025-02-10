import { useSelector } from "react-redux"
import { selectPostById } from "./postSlice"
import { RootStore } from "../../app/store"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { useParams } from "react-router-dom"
import { SinglePageArticle } from "./posts.module"

const SinglePostPage = () => {

  const { postId } = useParams()
  // retrieve postId

  const post = useSelector((state: RootStore) => selectPostById(state, postId ?? '1'))
  console.log(post);
  

  if(!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return(
    <SinglePageArticle>
      <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
      </div>
    </SinglePageArticle>
  )
}

export default SinglePostPage
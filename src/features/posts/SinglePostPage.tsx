import { useSelector } from "react-redux"
import { selectPostById } from "./postSlice"
import { RootStore } from "../../app/store"

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
    </article>
  )
}

export default SinglePostPage
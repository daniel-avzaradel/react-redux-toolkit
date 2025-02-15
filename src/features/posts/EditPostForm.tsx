import { useState } from "react";
 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { PostsApiState, selectPostById, updatePost } from "./postSlice";
import { AppDispatch, RootStore } from "../../app/store";
import { selectAllUsers } from "../users/usersSlice";
import { EditBtns, PostsSection } from "./posts.module";

const EditPostForm = () => {

  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const post = useSelector((state: RootStore) => postId && selectPostById(state, postId));
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [addRequestStatus, setAddRequestStatus] = useState<PostsApiState['status']>("idle");

  const dispatch = useDispatch<AppDispatch>();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
      setTitle(e.target.value);
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setContent(e.target.value);
    const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
      setUserId(Number(e.target.value));
  
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    if (!post) {
      return (
          <section>
              <h2>Post not found!</h2>
          </section>
      )
    }
    
    const onSavePostClicked = () => {
      if(canSave) {
        try {
          setAddRequestStatus('loading');
          dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

          setTitle("");
          setContent("");
          setUserId(undefined)
          navigate(`/post/${postId}`)
        } catch (error) {
          console.error('Filed to save the post', error)
        } finally {
          setAddRequestStatus('idle')
        }
      }
    };

    const usersOptions = users.map(user => (
      <option
          key={user.id}
          value={user.id}
      >{user.name}</option>
    ))

    return (
      <PostsSection>
          <h2>Edit Post</h2>
          <form>
              <label htmlFor="postTitle">Post Title:</label>
              <input
                  type="text"
                  id="postTitle"
                  name="postTitle"
                  value={title}
                  onChange={onTitleChanged}
              />
              <label htmlFor="postAuthor">Author:</label>
              <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                  <option value=""></option>
                  {usersOptions}
              </select>
              <label htmlFor="postContent">Content:</label>
              <textarea
                  id="postContent"
                  name="postContent"
                  value={content}
                  onChange={onContentChanged}
              />
              <br />
              <EditBtns>
              <button
                  type="button"
                  onClick={onSavePostClicked}
                  disabled={!canSave}
                  >
                  Save Post
              </button>
              <button className="deleteButton"
                  type="button"
                  >
                  Delete Post
              </button>
              </EditBtns>
          </form>
      </PostsSection>
  )
}

export default EditPostForm
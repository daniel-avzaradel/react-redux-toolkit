import { useState } from "react";
 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootStore } from "../../app/store";
import { selectAllUsers } from "../users/usersSlice";
import { EditPostsSection } from "./EditPost.module";
import { EditBtns } from "./posts.module";
import { PostsApiState, PostsState, selectPostById, updatePost } from "./postSlice";

const EditPostForm = () => {

  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const post: PostsState | undefined = useSelector((state: RootStore) => postId ? selectPostById(state, postId) : undefined);
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState<number | undefined>(post?.userId);
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
              <h2>Post not found!!!</h2>
          </section>
      )
    }
    
    const onSavePostClicked = async() => {
      if(canSave) {
        try {
          setAddRequestStatus('loading');
          await dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

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
      <EditPostsSection>
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
                  rows={5}
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
      </EditPostsSection>
  )
}

export default EditPostForm
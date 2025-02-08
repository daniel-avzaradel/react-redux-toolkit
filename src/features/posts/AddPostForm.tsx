import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost, PostsApiState } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";
import { PostsSection } from "./posts.module";
import { AppDispatch } from "../../app/store";

const AddPostForm = () => {

  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState<PostsApiState['status']>("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
  
  const onSavePostClicked = () => {
    if(canSave) {
      try {
        setAddRequestStatus('loading');
        dispatch(addNewPost({title, body: content, userId})).unwrap()

        setTitle("");
        setContent("");
        setUserId("")
      } catch (error) {
        console.error('Filed to save the post', error)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  };

  const usersOptions = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    )
  })

  return (
    <PostsSection>
      <h2>Add a New Post</h2>
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
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </PostsSection>
  );
};
export default AddPostForm;

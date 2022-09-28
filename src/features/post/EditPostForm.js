import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost, deletePost } from './postSlice';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/usersSlice';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  // get the post and user
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  // temp states
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  // check if no posts than display not found
  if (!post) {
    return (
      <section>
        <h2>Page not found!</h2>
      </section>
    );
  }

  // handle onChange events
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  // check if all fields are true
  const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

  // On Save - trigger when button clicked
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap(); //unwrap throws error if rejected

        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error('Failed to save the post: ', error);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('pending');
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle('');
      setContent('');
      setUserId('');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete the post: ', error);
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor='postAuthor'>Author:</label>
        <select id='postAuthor' default={userId} value={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {usersOptions}
        </select>

        <label htmlFor='postContent'>Content:</label>
        <textarea
          id='postContent'
          name='postContent'
          cols='30'
          rows='10'
          value={content}
          onChange={onContentChanged}
        />
        <button
          className='saveButton'
          type='button'
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
        <button className='deleteButton' type='button' onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;

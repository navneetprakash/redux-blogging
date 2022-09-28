import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // temp state for our controlled form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  // get all users from the state
  const users = useSelector(selectAllUsers);

  // check if all fields are true
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  // On Save - trigger when button clicked
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate('/');
      } catch (error) {
        console.error('Failed to save the post: ', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  // for user name options
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a new Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          type='text'
          id='posttitle'
          name='posttitle'
          value={title}
          onChange={onTitleChanged}
        />

        {/* render the user options */}

        <label htmlFor='postAuthor'>Author:</label>
        <select name='postAuthor' value={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {userOptions}
        </select>

        <label htmlFor='postContent'>Content:</label>

        <textarea id='postContent' name='postContent' value={content} onChange={onContentChanged} />
        <button onClick={onSavePostClicked} type='button' disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;

import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  // get all users
  const users = useSelector(selectAllUsers);

  // find the author name in users
  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;

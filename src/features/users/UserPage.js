import { useSelector } from 'react-redux';
import { selectPostsByUser } from '../post/postSlice';
import { selectUserById } from './usersSlice';
import { Link, useParams } from 'react-router-dom';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  // get all posts and filter by userId
  const postsForUser = useSelector((state) => selectPostsByUser(state, Number(userId)));

  // display all posts for user
  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;

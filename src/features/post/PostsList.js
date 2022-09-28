import { useSelector } from 'react-redux';
import { selectAllPosts, getPostsStatus, getPostsError } from './postSlice';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
  // get all posts from state, use the all posts selector
  const posts = useSelector(selectAllPosts);

  // post status from state
  const postsStatus = useSelector(getPostsStatus);

  // post error from state
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === 'loading') {
    content = <p className='loader'>Loading...</p>;
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />);
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;

import { useSelector } from 'react-redux';
import { selectPostIds, getPostsStatus, getPostsError } from './postSlice';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
  // get all posts from state, use the all posts selector
  const orderedPostIds = useSelector(selectPostIds);

  // post status from state
  const postsStatus = useSelector(getPostsStatus);

  // post error from state
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === 'loading') {
    content = <p className='loader'>Loading...</p>;
  } else if (postsStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => <PostsExcerpt key={postId} postId={postId} />);
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;

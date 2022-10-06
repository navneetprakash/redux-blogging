import AddPostForm from './features/post/AddPostForm';
import PostsList from './features/post/PostsList';
import SinglePostPage from './features/post/SinglePostPage';
import EditPostForm from './features/post/EditPostForm';
import UsersList from './features/users/UsersList';
import UserPage from './features/users/UserPage';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />} />

        {/* Post Route */}
        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>

        {/* User Route */}
        <Route path='user'>
          <Route index element={<UsersList />} />
          <Route path=':userId' element={<UserPage />} />
        </Route>

        {/* Catch all - route not found - replace bad request with / */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}

export default App;

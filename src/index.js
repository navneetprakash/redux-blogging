import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// imported store and provider to use redux
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchPosts } from './features/post/postSlice';
import { fetchUsers } from './features/users/usersSlice';

store.dispatch(fetchPosts());
// load users from the API when the app starts
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </Router>
  </Provider>
);

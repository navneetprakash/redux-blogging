import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseCount, getCount } from '../features/post/postSlice';

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);

  return (
    <header className='Header'>
      <h1>Redux Blogging</h1>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'post'}>Add Post</Link>
          </li>
          <li>
            <Link to={'user'}>Users</Link>
          </li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </nav>
    </header>
  );
};

export default Header;

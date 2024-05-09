import { Link } from 'react-router-dom';

const Header = () => {
  return (
      <nav className="topnav">
        <Link className="active" to="/profile">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar"/>
        </Link>
      </nav>
  );
};

export default Header

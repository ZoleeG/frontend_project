import { FaRegComments } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineTopic } from "react-icons/md";
import { Link } from 'react-router-dom';

const NavBar2 = () => {

    
  return (
      <nav className="navbar" id="myNavbar">
        <Link to="/" id="home-button"><RiHome2Line /></Link>
        <Link to="/topics" id="topics-button"><MdOutlineTopic /></Link>
      </nav>
  );
};

export default NavBar2
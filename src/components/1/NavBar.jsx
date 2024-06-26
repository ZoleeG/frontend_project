import { RiHome2Line } from "react-icons/ri";
import { LiaSortAmountDownAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { MdOutlineTopic } from "react-icons/md";

const NavBar = () => {
  return (
    <nav className="navbar" id="myNavbar">
      <Link to="/sort">
        <LiaSortAmountDownAltSolid />
      </Link>
      <Link to="/" id="home-button">
        <RiHome2Line />
      </Link>
      <Link to="/topics" id="topics-button">
        <MdOutlineTopic />
      </Link>
    </nav>
  );
};

export default NavBar;

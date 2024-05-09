import { FaRegComments } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineTopic } from "react-icons/md";
import { Link } from 'react-router-dom';

const ArticleInfoNavBar = ({article_id}) => {

  return (
      <nav className="navbar" id="myNavbar">
        <Link to={`/${article_id}/add_comment`} id="post-button">+</Link>
        <Link to="/" id="home-button"><RiHome2Line /></Link>
        <Link to="/topics" id="topics-button"><MdOutlineTopic /></Link>
      </nav>
  );
};

export default ArticleInfoNavBar
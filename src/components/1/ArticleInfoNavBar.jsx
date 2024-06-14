import { FaRegComments } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineTopic } from "react-icons/md";
import { Link } from 'react-router-dom';
import { RiArrowGoBackFill } from "react-icons/ri";

const ArticleInfoNavBar = ({article_id}) => {

  return (
      <nav className="navbar" id="myNavbar">
        <Link to={article_id ? `/${article_id}` : "/"} id="go_back_to_article" className='go_back_to_article'><RiArrowGoBackFill /> <p className='tooltiptext'>Go back to article</p> </Link>
        <Link to="/" id="home-button"><RiHome2Line /></Link>
        <Link to="/topics" id="topics-button"><MdOutlineTopic /></Link>
      </nav>
  );
};

export default ArticleInfoNavBar
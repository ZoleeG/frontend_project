import { FaComment } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import styles from "./SelectedArticle.module.css";
import { lineSpinner } from "ldrs";
import { useState, useEffect, useContext } from "react";
import { fetchArticleById, fetchCommentsByArticleId, patchVote } from "../../../utils/api.js";
import { Link } from "react-router-dom";
import { AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import ErrorPage from '../0/ErrorPage';
import { BiCommentAdd } from "react-icons/bi";

import { ThemeContext } from '../../context/Theme';
import CommentCard from '../2/CommentCard';

lineSpinner.register();

const SelectedArticle = ({ article_id }) => {

  const [isSending, setIsSending] = useState(false);
  const { activeUser, setActiveUser } = useContext(ThemeContext)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [error, setErr] = useState(null)
  const [isReRenderNeeded, setIsReRenderNeeded] = useState(false)
  
  const toggleOpen = () =>{
    setIsOpen((currOpen)=>!currOpen)
  }
  
  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchArticleById(article_id),fetchCommentsByArticleId(article_id)])
    .then(([article,comments]) => {
      setIsLoading(false);
      setSelectedArticle(article)
      setComments(comments)
    })
    .catch((err)=>{
      setErr({err})
    })
  }, [isReRenderNeeded]);

  if(error) {
    return <ErrorPage message={error.err.message}/>
  }

  const handleVote = (vote) => {
    setVoteChange((currVoteChange)=> currVoteChange+vote)
    patchVote(article_id, vote).then((updatedArticle)=>{

    }).catch((error)=>{
      setVoteChange((currVoteChange)=> currVoteChange-vote)
      alert(error)
    })
  }
  
  const {
    author,
    created_at,
    title,
    topic,
    body,
    article_img_url,
    comment_count,
    votes
  } = selectedArticle;
  
  return isLoading ? (
    <div className={styles.loading_symbol}>
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
  ) : (
  <div className={styles.outer_container}>
    <div className={styles.article_card}>
      <aside className={styles.author}>{author}
      </aside>
      <time className={styles.created_at}>
        {new Date(created_at).toLocaleDateString()}
      </time>
      <article className={styles.text}>
        <h4 className={styles.title}>
          {title}
        </h4>
        <i className={styles.topic}>
          # {topic}
        </i>
        <p className={styles.article}>
          {body}
        </p>
      </article>
      <img
        className={styles.img}
        src={article_img_url}
        alt={title}
      />
      
      <Link to={`/${article_id}/add_comment`} className={styles.add_comment_link} id={styles.post_button}><BiCommentAdd /><span className={styles.tooltiptext}>{!activeUser ? 'Please sign in to post a comment' : 'Add a comment'}</span></Link>
      <div className={styles.comment_count} onClick={toggleOpen}>{!isOpen ? <><FaComment/><p className={styles.tooltiptext}>Hide comments</p></> : <><IoChatbubbleOutline/><p className={styles.tooltiptext}>Show me the comments</p></>}
        {comment_count}
      </div>
      <div className={styles.votes}>
      <button className={styles.tooltip} id={styles.up} disabled={voteChange === 1} onClick={() => handleVote(1)}><AiOutlineLike /><p className={styles.tooltiptext}>Vote up</p></button>{+votes+voteChange}<button className={styles.tooltip} id={styles.down} disabled={voteChange === -1} onClick={() => handleVote(-1)}><AiOutlineDislike /><p className={styles.tooltiptext}>Vote down</p></button>
      </div>
    </div>
    <CommentCard setIsReRenderNeeded={setIsReRenderNeeded} comments={comments} isOpen={isOpen} isSending={isSending} setIsSending={setIsSending}/>
  </div>
  );
};

export default SelectedArticle;

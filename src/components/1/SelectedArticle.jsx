import { FaComment } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import styles from "./SelectedArticle.module.css";
import { lineSpinner } from "ldrs";
import { useState, useEffect } from "react";
import { fetchArticleById, fetchCommentsByArticleId, patchVote } from "../../../utils/api.js";
import { Link } from "react-router-dom";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import ErrorPage from '../0/ErrorPage';

lineSpinner.register();

const SelectedArticle = ({ article_id }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [error, setErr] = useState(null)
  
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
  }, [article_id]);

  if(error) {
    return <ErrorPage message={error.err.message}/>
  }
  
  const handleVote = (vote) => {
    patchVote(article_id, vote)
    setVoteChange((currVoteChange)=> currVoteChange+vote)
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
      <div className={styles.comment_count} onClick={toggleOpen}>{isOpen ? <FaComment /> : <IoChatbubbleOutline />}
        {comment_count}
      </div>
      <div className={styles.votes}>
        <button className={styles.like_btn} disabled={voteChange === 1} onClick={() => handleVote(1)}><AiOutlineLike /></button>{+votes+voteChange}<button className={styles.like_btn} disabled={voteChange === -1} onClick={() => handleVote(-1)}><AiOutlineDislike /></button>
      </div>
    </div>
  
    <ol className={styles.body}>
      {comments.map((comment) => {
        const {
            comment_id,
            body,
            author,
            votes,
            created_at
        } = comment;
        const date = new Date(created_at)
        return (
          <li id={comment_id} key={comment_id} className={isOpen ? styles.listed_comment : styles.listed_comment_hide}>
              
              <article className={styles.comment_card}>
                <aside className={styles.author}>{author}</aside>
                <time className={styles.created_at}>{date.toLocaleDateString()}</time>
                <p className={styles.text}>
                  {body}
                </p>
                <div className={styles.comment_count}><IoChatbubbleOutline /></div>
                <div className={styles.votes}><FaRegHeart />{+votes}</div>
              </article>
          </li>
        );
      })}
    </ol>
  </div>
  );
};

export default SelectedArticle;

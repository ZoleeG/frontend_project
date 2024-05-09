import { FaComment } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import styles from "./SelectedArticle.module.css";
import { lineSpinner } from "ldrs";
import { useState, useEffect } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "../../../utils/api.js";
import { Link } from "react-router-dom";

lineSpinner.register();

const SelectedArticle = ({ article_id, votes}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const toggleOpen = () =>{
    setIsOpen((currOpen)=>!currOpen)
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchArticleById(article_id),fetchCommentsByArticleId(article_id)])
    .then(([article,comments]) => {
      if(!article)return Promise.reject({status: 404, msg: 'not found'})
      setSelectedArticle(article)
      setComments(comments)
      setIsLoading(false);
    })
    .catch((err)=>{
      return <div>{err.msg}</div>
    })
  }, [article_id]);

  return isLoading ? (
    <div className={styles.loading_symbol}>
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
  ) : (<div className={styles.outer_container}>
    <div className={styles.article_card}>
      <aside className={styles.author}>{selectedArticle.author}
      </aside>
      <time className={styles.created_at}>
        {new Date(selectedArticle.created_at).toLocaleDateString()}
      </time>
      <article className={styles.text}>
        <h4 className={styles.title}>
          {selectedArticle.title}
        </h4>
        <i className={styles.topic}>
          # {selectedArticle.topic}
        </i>
        <p className={styles.article}>
          {selectedArticle.body}
        </p>
      </article>
      <img
        className={styles.img}
        src={selectedArticle.article_img_url}
        alt={selectedArticle.title}
      />
      <div className={styles.comment_count} onClick={toggleOpen}>{isOpen ? <FaComment /> : <IoChatbubbleOutline />}
        
        {selectedArticle.comment_count}
      </div>
      <div className={styles.votes}>
        <FaRegHeart />
        {votes}
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
          <li id={comment_id} key={comment_id}>
              
              <article className={styles.comment_card}>
                <h1 className={styles.author}>{author}</h1>
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

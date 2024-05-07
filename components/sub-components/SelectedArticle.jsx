import { FaComment } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import styles from "./SelectedArticle.module.css";
import { lineSpinner } from "ldrs";
import { useState, useEffect } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "../../utils/api.js";
import { Link } from "react-router-dom";

lineSpinner.register();

const SelectedArticle = ({setComments, article_id, votes, isLoading, setIsLoading, isOpen, setIsOpen}) => {
  
  const [selectedArticle, setSelectedArticle] = useState([]);
  

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
    });
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
  ) : (
    <div className={styles.article_card}>
      <div className={styles.author}>{selectedArticle.author}</div>
      <div className={styles.created_at}>
        {new Date(selectedArticle.created_at).toLocaleDateString()}
      </div>
      <div className={styles.text}>
        <div className={styles.title}>
          <h4>
            <b>{selectedArticle.title}</b>
          </h4>
        </div>
        <div className={styles.topic}>
          <i># {selectedArticle.topic}</i>
        </div>
        <article className={styles.article}>{selectedArticle.body}</article>
      </div>
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
  );
};

export default SelectedArticle;

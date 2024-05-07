import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import styles from "./Comments.module.css";
import { lineSpinner } from "ldrs";
import { fetchCommentsByArticleId } from "../../utils/api.js";
import { Link } from "react-router-dom";

lineSpinner.register();

const Comments = ({ isOpen, comments, isLoading, article_id }) => {

  return !isLoading && isOpen && (
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
              
              <div className={styles.comment_card}>
                <div className={styles.author}>{author}</div>
                <div className={styles.created_at}>{date.toLocaleDateString()}</div>
                <div className={styles.text}>
                  {body}
                </div>
                <div className={styles.comment_count}><IoChatbubbleOutline /></div>
                <div className={styles.votes}><FaRegHeart />{+votes}</div>
              </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Comments;
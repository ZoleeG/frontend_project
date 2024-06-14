import styles from './CommentCard.module.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { ThemeContext } from '../../context/Theme';
import { useState, useEffect, useContext } from "react";
import { deleteComment } from "../../../utils/api.js";

const CommentCard = ({comments, isOpen, setIsReRenderNeeded}) =>{
    const { activeUser, setActiveUser } = useContext(ThemeContext)
    const [deletedComment, setDeletedComment] = useState()
    const [err, setErr] = useState()
    const [isDeleting, setIsDeleting] = useState()

    const handleDelete = (comment_id, author) => {
          setErr(null)
          setDeletedComment(comment_id)
          setIsDeleting(true)
          deleteComment(comment_id).then(()=>{
            setIsDeleting(false)
            setIsReRenderNeeded((currValue)=>!currValue)
          })
          .catch((error)=>{
            setIsDeleting(false)
            setErr(error.message)
            setDeletedComment(null)
          })
      }

    return err ? <b className={styles.error_message}>{err}</b> : <ol className={styles.body}>
    {comments.map((comment) => {
      const {
          comment_id,
          body,
          author,
          votes,
          created_at
      } = comment;
      const date = new Date(created_at)
      return deletedComment===comment_id ? <b key='delete' className={styles.delete_message}>{isDeleting ? 'Comment is being deleted, please wait...' : 'Delete has been completed'} </b> : (
        <li id={comment_id} key={comment_id} className={!isOpen ? styles.listed_comment : styles.listed_comment_hide}>
            
            <article className={styles.comment_card}>
              <aside className={styles.author}>{author}</aside>
              <time className={styles.created_at}>{date.toLocaleDateString()}</time>
              <p className={styles.text}>
                {body}
              </p>
              {activeUser && activeUser.username===author && <button disabled={isDeleting} className={styles.bin_btn} type='button' onClick={()=>{handleDelete(comment_id, author)}}><RiDeleteBinLine/><p className={styles.tooltiptext}>Delete comment</p></button>}
              <div className={styles.comment_count}><IoChatbubbleOutline /></div>
              <div className={styles.votes}><FaRegHeart />{+votes}</div>
            </article>
        </li>
      );
    })}
  </ol>
}

export default CommentCard
import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { postComment } from '../../../utils/api.js'
import styles from './PostComment.module.css';
import ArticleInfoNavBar from "../1/ArticleInfoNavBar";
import Header from "../1/Header";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ThemeContext } from '../../context/Theme';

const PostComment = () => {

    
    const { activeUser, setActiveUser } = useContext(ThemeContext)
    const [isSending, setIsSending] = useState(false);
    const [comment, setComment] = useState("")
    const { article_id } = useParams()
    const [err, setErr] = useState(null)
    const [message, setMessage] = useState()
    
    const handleSubmit = (e) => {
      e.preventDefault();
        setIsSending(true)
        setErr(null)
        setMessage(null)
        postComment(article_id, activeUser.username, comment).then(()=>{
          setIsSending(false)
          setMessage('Comment has been posted!')
          setComment("")
        }).catch((error)=>{
          setIsSending(false)
          setComment("")
          setErr('Oops, something went wrong, try again!')
        })
    }
  
    return (<div className={styles.grid_container}>
        <Header className={styles.header} />
        <ArticleInfoNavBar className={styles.navbar} article_id={article_id}/>
      <form onSubmit={handleSubmit} className={styles.comment} id={styles.post_comment_form}>
        <h1>Please post your comment below</h1>
        <label htmlFor={styles.comment}>
          <textarea id={styles.comment}
            type="text" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Comment here..."
          />
        </label><br/>
        <input disabled={isSending || !activeUser} className={!isSending ? styles.submit : styles.disabled_submit} type="submit" value={isSending ? 'SENDING': 'SEND'}/>{message ? <p className={styles.check}><FaRegCircleCheck /></p> : null}<br/>
        {err ? <p className={styles.error}>{err}</p> : null}
        {message ? <p className={styles.success}>{message}</p> : null}
        {!activeUser ? <p className={styles.error}>Please sign in to post a comment</p> : null}
      </form>
      </div>
    )
}

export default PostComment
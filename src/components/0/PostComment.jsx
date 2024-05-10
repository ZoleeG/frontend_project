import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { postComment } from '../../../utils/api.js'
import styles from './PostComment.module.css';
import ArticleInfoNavBar from "../1/ArticleInfoNavBar";
import Header from "../1/Header";
import { FaRegCircleCheck } from "react-icons/fa6";

const PostComment = () => {

  const [isSending, setIsSending] = useState(false);
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("")
    const { article_id } = useParams()
    const [err, setErr] = useState(null)
    const [message, setMessage] = useState()
    
    const handleSubmit = (e) => {
      e.preventDefault();
        setIsSending(true)
        setErr(null)
        setMessage(null)
        postComment(article_id, author, comment).then(()=>{
          setIsSending(false)
          setMessage('Comment has been posted!')
          setAuthor("")
          setComment("")
        }).catch((error)=>{
          setIsSending(false)
          setAuthor("")
          setComment("")
          setErr('Oops, something went wrong, try again!')
        })
    }
  
    return (<div className={styles.grid_container}>
        <Header className={styles.header} />
        <ArticleInfoNavBar className={styles.navbar}/>
      <form onSubmit={handleSubmit} className={styles.comment} id={styles.post_comment_form}>
        <h1>Please post your comment below</h1>
        <label htmlFor={styles.author}>Please select a user<br/>
          <select id={styles.author}
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          >
            <option value="">Please select</option>
            <option value="tickle122">tickle122</option>
            <option value="grumpy19">grumpy19</option>
            <option value="happyamy2016">happyamy2016</option>
            <option value="cooljmessy">cooljmessy</option>
            <option value="weegembump">weegembump</option>
            <option value="jessjelly">jessjelly</option>
            <option value="invalid">Non-existent username</option>
          </select>
        </label><br />
        <label htmlFor={styles.comment}>Type your comment below
          <textarea id={styles.comment}
            type="text" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Comment here..."
          />
        </label><br/>
        <input disabled={isSending} className={!isSending ? styles.submit : styles.disabled_submit} type="submit" value={isSending ? 'SENDING': 'SEND'}/>{message ? <p className={styles.check}><FaRegCircleCheck /></p> : null}<br/>
        {err ? <p className={styles.error}>{err}</p> : null}
        {message ? <p className={styles.success}>{message}</p> : null}
      </form>
      </div>
    )
}

export default PostComment
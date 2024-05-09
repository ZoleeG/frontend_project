import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { postComment } from '../../../utils/api.js'
import styles from './PostComment.module.css';
import ArticleInfoNavBar from "../1/ArticleInfoNavBar";
import Header from "../1/Header";

const PostComment = () => {

  const [isSending, setIsSending] = useState(false);
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("")
    const { article_id } = useParams()
    
    const handleSubmit = (e) => {
      e.preventDefault();
        setIsSending(true)
        postComment(article_id, author, comment).then(()=>{
          setIsSending(false)
          setAuthor("")
          setComment("")
        })
    }
  
    return (<div className={styles.grid_container}>
        <Header className={styles.header} />
        <ArticleInfoNavBar className={styles.navbar}/>
      <form onSubmit={handleSubmit} className={styles.comment}>
        <h1>Please post your comment below</h1>
        <label htmlFor="author">Please select a user<br/>
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
          </select>
        </label><br />
        <label htmlFor="comment">Type your comment below
          <textarea id={styles.comment}
            type="text" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Comment here..."
          />
        </label><br/>
        <input disabled={isSending} className={!isSending ? styles.submit : styles.disabled_submit} type="submit" value={isSending ? 'SENDING...': 'SEND'}/>
      </form>
      </div>
    )
}

export default PostComment
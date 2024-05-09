import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import styles from "./Articles.module.css";
import { lineSpinner } from "ldrs";
import { useState, useEffect } from "react";
import { fetchArticles } from "../../../utils/api.js";
import { Link } from "react-router-dom";

lineSpinner.register();

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles().then((fetchedArticles) => {
      setArticles(fetchedArticles);
      setIsLoading(false);
    });
  }, []);

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
    <ol className={styles.body}>
      {articles.map((article) => {
        const {
          article_id,
          title,
          topic,
          author,
          votes,
          created_at,
          comment_count,
          article_img_url,
        } = article;
        const date = new Date(created_at)
        return (
          <li id={article_id} key={article_id}>
              <Link to={`/${article_id}`}>
              <div className={styles.article_card}>
                <div className={styles.author}>{author}</div>
                <div className={styles.created_at}>{date.toLocaleDateString()}</div>
                <div className={styles.text}>
                  <div className={styles.title}>
                    <h4>
                      <b>{title}</b>
                    </h4>
                  </div>
                <div className={styles.topic}>
                  <i># {topic}</i>
                </div>
                </div>
                <img className={styles.img} src={article_img_url} alt={title} />
                <div className={styles.comment_count}><IoChatbubbleOutline />{comment_count}</div>
                <div className={styles.votes}><FaRegHeart />{+votes}</div>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};

export default Articles;
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { capitaliseStr } from "../../utils/capitaliseStr";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteArticles } from "../../utils/api";
import { UserContext } from "../context/UserProvider";


export default function ArticleCard ({setArticleCount, articleCount, article, setAlertMessage, setShowAlertMessage, articles, setArticles}) {

  const { activeUser } = useContext(UserContext);

  function handleDelete (event, articleToRemove) {
    event.preventDefault()
    deleteArticles(articleToRemove.article_id).then(() => {
        setAlertMessage("Article Deleted!");
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
        }, 4000);
        setArticles((currArticles) => {
          const filteredArticles = currArticles.filter((article) => {
            return article.article_id !== articleToRemove.article_id;
          });
          return filteredArticles;
        });
        setArticleCount(articleCount - 1);
      })
      .catch((err) => {
        setArticles(articles);
        setAlertMessage("Error deleting article, try again later");
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
        }, 4000);
      });
  }

  const createdAt = article.created_at;
  const date = createdAt.substring(0, 10);
  return (
    <Link to={`/${article.article_id}`} className="link">
      <div className="card min-w-[18rem] max-w-[23rem] h-[22rem] bg-base-100 shadow-xl my-7 mx-5 overflow-hidden">
        <figure className="h-[8rem]">
          <img src={article.article_img_url} alt={article.title} />
        </figure>
        <div className="card-body px-4 py-4">
          <div className="flex justify-between">
            <h2 className="card-title overflow-hidden">{article.title}</h2>
          </div>
          <p className="overflow-hidden">
            {" "}
            By {article.author}
            <span id="article-date" className="ml-4 overflow-hidden">{date}</span>
          </p>
          <div className="card-actions justify-end overflow-hidden pb-2">
            <div className="badge badge-outline overflow-hidden px-3 py-3">
              Votes: {+article.votes}
            </div>
            <div className="badge badge-outline overflow-hidden px-3 py-3">
              Comments: {article.comment_count}
            </div>
            <div className="badge overflow-hidden bg-[#3f51b5] border-[#3f51b5] text-white px-3 py-3">
              {capitaliseStr(article.topic)}
            </div>
          </div>
            {activeUser?.username === article.author ?
            <div className="flex justify-center" >
              <DeleteIcon id="deleteComment-icon" onClick={(event) => { handleDelete(event, article) }} />
            </div> : null}
        </div>
      </div>
    </Link>
  );
};

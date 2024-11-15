import { lineSpinner } from "ldrs";
import { useState, useEffect } from "react";
import { fetchArticleById } from "../../utils/api.js";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import { Chip } from "@mui/material";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { BookmarkRemove } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleVotes from "./ArticleVotes.jsx";
import Comments from "./Comments.jsx";
import FloatingActionBtn from "./FloatingActionBtn.jsx";
import SuccessAlert from "./SuccessAlert.jsx";

lineSpinner.register();

export default function ArticleById({ setBookmarked, bookmarked }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { article_id } = useParams();

  const [selectedArticle, setSelectedArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErr] = useState(null);
  const [commentCount, setCommentCount] = useState(selectedArticle.comment_count);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id)
      .then((article) => {
        setIsLoading(false);
        setSelectedArticle(article);
      })
      .catch((err) => {
        setErr({ err });
      });
  }, []);

  if (error) {
    return <ErrorPage message={error.err.message} />;
  }

  function handleBookmarkAdd(articleToAdd) {
    for (const article of bookmarked) {
      if (article.article_id === articleToAdd.article_id) {
        setAlertMessage("Error, article already bookmarked");
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
        }, 4000);
        return;
      }
    }
    setBookmarked((currBookmarked) => {
      return [selectedArticle, ...currBookmarked];
    });
    setIsBookmarked(true);
  }

  function handleBookmarkRemove(articleToRemove) {
    setBookmarked((currBookmarked) => {
      return currBookmarked.filter((article) => {
        return article.article_id !== articleToRemove.article_id;
      });
    });
    setIsBookmarked(false);
  }

  const dateObj = new Date(selectedArticle.created_at);
  const date =
    dateObj.toDateString() + " " + dateObj.toTimeString().substring(0, 8);

  const currentURL = window.location.href;

  const { author, title, topic, body, article_img_url, comment_count, votes } =
    selectedArticle;

  return isLoading ? (
    <div className="spinner">
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
  ) : (
    <>
      <SuccessAlert
        showAlertMessage={showAlertMessage}
        alertMessage={alertMessage}
      />
      <section className="article lg:flex lg:flex-row">
        <img
          className="max-w-[800px] lg:min-w-[600px] lg:mr-[2rem]"
          src={article_img_url}
          alt={title}
        />
        <div>
          <div className="flex items-center justify-between">
            <Chip
              id="article-topic"
              label={topic}
              className="dark:bg-slate-200"
            />
            <div className="flex items-center">
              {!isBookmarked ? (
                <BookmarkAddIcon
                  style={{ fontSize: "2rem" }}
                  onClick={() => handleBookmarkAdd(selectedArticle)}
                  className="hover:text-[#3f51b5] hover:cursor-pointer"
                ></BookmarkAddIcon>
              ) : (
                <BookmarkRemove
                  style={{ fontSize: "2rem" }}
                  onClick={() => handleBookmarkRemove(selectedArticle)}
                  className="hover:text-[#3f51b5] hover:cursor-pointer"
                ></BookmarkRemove>
              )}
              <FacebookShareButton
                url={currentURL}
                className="w-[2rem] rounded"
                windowHeight={screen.height}
                windowWidth={screen.width}
              >
                <FacebookIcon
                  className="w-[1.8rem]"
                  round={true}
                ></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton
                url={currentURL}
                className="w-[2rem] rounded"
                windowHeight={screen.height}
                windowWidth={screen.width}
              >
                <TwitterIcon className="w-[1.8rem]" round={true}></TwitterIcon>
              </TwitterShareButton>
              <WhatsappShareButton
                url={currentURL}
                className="w-[2rem] rounded"
                windowHeight={screen.height}
                windowWidth={screen.width}
              >
                <WhatsappIcon
                  className="w-[1.8rem]"
                  round={true}
                ></WhatsappIcon>
              </WhatsappShareButton>
            </div>
          </div>
          <h2 id="article-title">{title}</h2>
          <div className="date-and-author">
            <p className="article-date">{date}</p>
            <div className="article-author">
              <AccountCircleIcon></AccountCircleIcon>
              <p id="article-username">{author}</p>
            </div>
          </div>
          <p id="article-body">{body}</p>
          <p id="article-commentCount">Comments: {comment_count}</p>
        </div>
      </section>
      <section className="voting-section ">
        <ArticleVotes selectedArticle={selectedArticle} />
      </section>
      <section className="comment-section ">
        <h2 className="comments-header ml-[2rem] mb-0">Comments</h2>
        <Comments
          setCommentCount={setCommentCount}
          commentCount={commentCount}
          setAlertMessage={setAlertMessage}
          setShowAlertMessage={setShowAlertMessage}
        />
      </section>
      <div className="fixed bottom-5 right-5 p-[1rem]">
        <FloatingActionBtn />
      </div>
    </>
  );
}

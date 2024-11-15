import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useParams, useSearchParams } from "react-router-dom";
import PostNewComment from "./PostNewComment";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentPagination from "./CommentPagination";
import CommentVotes from "./CommentVotes";
import "../styles/ArticlesById.css";
import { deleteComments, getUsers, getArticleComments, getTotalComments } from "../../utils/api";
import CommentsSortingOptions from "./CommentsSortingOptions";

export default function Comments({
  setCommentCount,
  commentCount,
  setAlertMessage,
  setShowAlertMessage,
}) {
  const { article_id } = useParams();
  const { activeUser } = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [commentsPage, setCommentsPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by") || sortBy;
  const orderQuery = searchParams.get("order") || order;
  const limitQuery = searchParams.get("limit") || limit;
  const pageQuery = searchParams.get("p") || commentsPage;

  const [totalComments, setTotalComments] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getTotalComments(article_id).then((total) => {
      setTotalComments(total);
      setTotalPages(Math.ceil(total / limitQuery));
    });

    getArticleComments(article_id, pageQuery, limitQuery, sortByQuery, orderQuery)
      .then((comments) => {
        setComments(comments);
      })
      .then(() => {
        getUsers().then((users) => {
          setUsers(users);
          setIsLoading(false);
        });
      });
  }, [article_id, pageQuery, limitQuery, sortByQuery, orderQuery]);

  if (isLoading) {
    return <p className="p-[2rem]">Comments loading...</p>;
  }

  if (!comments.length) {
    return (
      <>
        <p className="p-[2rem]">No comments yet...</p>
        <PostNewComment
          comments={comments}
          setComments={setComments}
          setCommentCount={setCommentCount}
          commentCount={commentCount}
        />
      </>
    );
  }

  function handleDelete(commentToRemove) {
    deleteComments(commentToRemove.comment_id)
      .then(() => {
        setAlertMessage("Comment Deleted!");
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
        }, 4000);
        setComments((currComments) => {
          const filteredComments = currComments.filter((comment) => {
            return comment.comment_id !== commentToRemove.comment_id;
          });
          return filteredComments;
        });
        setCommentCount(commentCount - 1);
      })
      .catch((err) => {
        setComments(comments);
        setAlertMessage("Error deleting comment, try again later");
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
        }, 4000);
      });
  }

  return (
    <div>
      <PostNewComment
        comments={comments}
        setComments={setComments}
        setCommentCount={setCommentCount}
        commentCount={commentCount}
      />
      <CommentsSortingOptions
        totalPages={totalPages}
        setCommentsPage={setCommentsPage}
        limit={limit}
        setLimit={setLimit}
        setSortBy={setSortBy}
        sortBy={sortBy}
        setOrder={setOrder}
        order={order}
      />
      <ul className="flex content-start m-[2rem]">
        {comments.map((comment) => {
          const dateObj = new Date(comment.created_at);
          const date = comment.created_at.substring(0, 10);
          const time = dateObj.toTimeString().substring(0, 8);

          const dateTime = date + " " + time;

          return (
            <li key={comment.comment_id} className="my-[0.5] w-[50rem]">
              <div className="chat chat-start w-9/10">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full border-2 border-[#eb4b1a] bg-white">
                    <img
                      alt="comment author avatar"
                      src={
                        users.find((user) => user.username === comment.author)
                          .avatar_url
                      }
                      className=""
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {comment.author}
                  <time className="text-xs opacity-50 ml-4 dark:opacity-70">
                    {dateTime}
                  </time>
                </div>
                <div className="chat-bubble bg-slate-100 text-[#282a36] dark:bg-[#64644d] dark:text-[#dadadd]">
                  {comment.body}
                  {
                    activeUser?.username === comment.author ? (
                    <DeleteIcon
                      onClick={() => {
                        handleDelete(comment);
                      }}
                      id="deleteComment-icon"
                      className="ml-3"
                    ></DeleteIcon>
                  ) : null}
                </div>
                <div className="chat-footer opacity-50">
                  <CommentVotes comment={comment} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <CommentPagination
        commentsPage={commentsPage}
        setCommentsPage={setCommentsPage}
        totalPages={totalPages}
      />
    </div>
  );
}

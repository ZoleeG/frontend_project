import { RiDeleteBinLine } from "react-icons/ri";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { UserContext } from "../context/UserProvider.jsx";
import { useState, useEffect, useContext } from "react";
import { deleteComments } from "../../utils/api.js";

export default function CommentCard ({ comments, isOpen, setIsReRenderNeeded }) {
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [deletedComment, setDeletedComment] = useState();
  const [err, setErr] = useState();
  const [isDeleting, setIsDeleting] = useState();

  const handleDelete = (comment_id, author) => {
    setErr(null);
    setDeletedComment(comment_id);
    setIsDeleting(true);
    deleteComments(comment_id)
      .then(() => {
        setIsDeleting(false);
        setIsReRenderNeeded((currValue) => !currValue);
      })
      .catch((error) => {
        setIsDeleting(false);
        setErr(error.message);
        setDeletedComment(null);
      });
  };

  return err ? (
    <b className="error_message">{err}</b>
  ) : (
    <ol className="body">
      {comments.map((comment) => {
        const { comment_id, body, author, votes, created_at } = comment;
        const date = new Date(created_at);
        return deletedComment === comment_id ? (
          <b key="delete" className="delete_message">
            {isDeleting
              ? "Comment is being deleted, please wait..."
              : "Delete has been completed"}{" "}
          </b>
        ) : (
          <li
            id={comment_id}
            key={comment_id}
            className={
              !isOpen ? "listed_comment" : "listed_comment_hide"
            }
          >
            <article className="comment_card">
              <aside className="author">{author}</aside>
              <time className="created_at">
                {date.toLocaleDateString()}
              </time>
              <p className="text">{body}</p>
              {activeUser && activeUser.username === author && (
                <button
                  disabled={isDeleting}
                  className="bin_btn"
                  type="button"
                  onClick={() => {
                    handleDelete(comment_id, author);
                  }}
                >
                  <RiDeleteBinLine />
                  <p className="tooltiptext">Delete comment</p>
                </button>
              )}
              <div className="comment_count">
                <IoChatbubbleOutline />
              </div>
              <div className="votes">
                <FaRegHeart />
                {+votes}
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
};

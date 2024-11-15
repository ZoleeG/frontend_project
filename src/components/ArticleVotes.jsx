import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState } from "react";
import { patchArticleVotes } from "../../utils/api";
import '../styles/ArticlesById.css'

export default function ArticleVotes({ selectedArticle }) {
  const [votes, setVotes] = useState(selectedArticle.votes);
  const [errorMessage, setErrorMessage] = useState("");
  const [voteChange, setVoteChange] = useState(0);

  function handleUpvoteClick() {
    setVoteChange(voteChange+1)
    setVotes(votes+1)

    const newVotes = {
      inc_votes: 1,
    };

    patchArticleVotes(selectedArticle.article_id, newVotes)
      .then((article) => {
        setVotes(article[0].votes);
      })
      .catch((err) => {
        setErrorMessage("Error voting, please try again later");
        setVotes(votes-1)
        setVoteChange(voteChange-1)
      });
  }

  function handleDownvoteClick() {
    setVoteChange(voteChange-1)

    setVotes(votes-1)

    const newVotes = {
      inc_votes: -1,
    };

    patchArticleVotes(selectedArticle.article_id, newVotes)
      .then((article) => {
        setVotes(article[0].votes);
      })
      .catch((err) => {
        setErrorMessage("Error voting, please try again later");
        setVotes(votes+1);
        setVoteChange(voteChange+1)
      });
  }

  return (
    <>
      <button
        className="vote-button"
            disabled={voteChange === 1}
        onClick={() => handleUpvoteClick()}
      >
        <ThumbUpIcon />
      </button>
      <p>{votes}</p>
      <button
        className="vote-button"
        onClick={() => {
          handleDownvoteClick();
        }}
        disabled={voteChange === -1}
      >
        <ThumbDownIcon />
      </button>
      <p>{errorMessage}</p>
    </>
  );
}

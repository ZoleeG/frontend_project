import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState } from 'react';
import { patchCommentVotes } from '../../utils/api';
import '../styles/ArticlesById.css'

export default function CommentVotes({comment}) {
    const [votes, setVotes] = useState(comment.votes)
    const [errorMessage, setErrorMessage] = useState('')
  const [voteChange, setVoteChange] = useState(0);

    function handleUpvoteClick() {
        setVoteChange(voteChange+1)
        setVotes(votes + 1)

        const newVotes = {
            inc_votes: 1
        }

        patchCommentVotes(comment.comment_id, newVotes).then((comment) => {
            setVotes(comment[0].votes)
        })
        .catch((err) => {
            setErrorMessage('Error voting, please try again later')
            setVotes(votes)
            setVoteChange(voteChange-1)
        })
    }

    function handleDownvoteClick() {
        setVoteChange(voteChange-1)
        setVotes(votes - 1)

        const newVotes = {
            inc_votes: -1
        }

        patchCommentVotes(comment.comment_id, newVotes).then((comment) => {
            setVotes(comment[0].votes)
        })
        .catch((err) => {
            setErrorMessage('Error voting, please try again later')
            setVotes(votes)
            setVoteChange(voteChange+1)
        })
    }

    return (
        <section className="flex">
            <div className="pt-2" >Votes: {votes}</div>
            <div className="px-4 py-1">
                <button className="vote-button mx-2 hover:opacity-1 dark:text-white dark:hover:text-orange-500" onClick={() => handleUpvoteClick()} disabled={voteChange === 1} ><ThumbUpIcon /></button>
                <button className="vote-button
                hover:opacity-1 dark:text-white
                dark:hover:text-orange-500" onClick={() => {
                    handleDownvoteClick()
                }} disabled={voteChange === -1} ><ThumbDownIcon /></button>
            </div>
            <p>{errorMessage}</p>
        </section>
    )
}
import { postComment } from "../../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useParams, Link } from "react-router-dom";
import '../styles/NewComment.css'
import { TextField, Button } from "@mui/material";
import SuccessAlert from "./SuccessAlert";

export default function PostNewComment({comments, setComments, setCommentCount, commentCount}) {

    const [commentInput, setCommentInput] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlertMessage, setShowAlertMessage] = useState(false)

    const {article_id} = useParams()
    const { activeUser } = useContext(UserContext)

    function handleChange(event) {
        setCommentInput(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const inputBody = {body: commentInput, username: activeUser.username}
        setCommentInput('')
    
        postComment(article_id, inputBody).then((newComment) => {
            setAlertMessage('Comment Posted!')
            setShowAlertMessage(true)
               setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
            const updatedCommentCount = commentCount + 1
            setCommentCount(updatedCommentCount)
            setComments([newComment[0], ...comments])
        }).catch((err) => {
            setAlertMessage('Error commenting, please try again later')
            setShowAlertMessage(true)
            setTimeout(() => {
             setShowAlertMessage(false)
         }, 4000)
        })
    }

    return (
        <section className="flex justify-center my-[1rem]">
            <SuccessAlert showAlertMessage={showAlertMessage} alertMessage={alertMessage} className="m-0"/>
            { activeUser?.username ? <form onSubmit={handleSubmit} id="newComment-form">
                <label htmlFor="comment-input"></label>
                <TextField type="text" placeholder="Add comment" name="comment-input" id="comment-input" value={commentInput} onChange={handleChange} variant="filled" required className="border-white dark:bg-white dark:opacity-60"></TextField>
                <Button type="submit"  id="newComment-button">Post</Button>
            </form> : <div className="flex flex-col justify-center text-center pb-[1rem] my-0" >
            <h2 className="font-bold p-[1rem]">Login to leave a comment</h2>
              <Link to='/users' className="max-w-[20rem] m-auto"><button className="p-[0.8rem] rounded-lg bg-[#f77d19] text-white font-bold">Login</button></Link>
        </div>}
        </section>
    )
}
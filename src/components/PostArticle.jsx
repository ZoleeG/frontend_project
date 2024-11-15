import { lineSpinner } from "ldrs";
import { getTopics, postTopic } from '../../utils/api';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../context/UserProvider";
import { postArticle } from '../../utils/api';
import SuccessAlert from './SuccessAlert';
import { capitaliseStr } from '../../utils/capitaliseStr';

lineSpinner.register();


export function PostArticle({articles, setArticles}) {

    const { activeUser } = useContext(UserContext)

    if (!activeUser.username) {
        return( <div className="flex flex-col justify-center p-[2rem]">
              <h2 className="text-center font-bold text-[1.3rem] py-[2rem]">Login to post an article</h2>
              <Link to='/users' className="max-w-[20rem] m-auto"><button className="p-[1rem] rounded-lg bg-[#DD3232] text-white">Login</button></Link>
        </div>
        )
    }

    const [topics, setTopics] = useState([])
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlertMessage, setShowAlertMessage] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const [newArticleInput, setNewArticleInput] = useState({author:activeUser.username, title:'', body:'', topic:'coding', article_img_url:''})

    const [isNewTopic, setIsNewTopic] = useState(false)
    const [newTopicInput, setNewTopicInput] = useState({slug:'', description:''})

    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        getTopics().then((topicsArr) => {
            setTopics(topicsArr)
            setIsLoading(false)
        })
    })

    function handleChange(event) {
        setNewArticleInput({...newArticleInput, [event.target.name] : event.target.value})
    }

    function handleNewTopic(event) {
        setNewTopicInput({...newTopicInput, [event.target.name] : event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault()

        postArticle(newArticleInput).then((article)=> {
            setAlertMessage('Article Posted!')
            setShowAlertMessage(true)
               setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
            setArticles([article, ...articles])
        }).catch((err) => {
            setAlertMessage('Error posting article, please try again later')
            setShowAlertMessage(true)
            setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
        }).finally(()=>{
            setNewArticleInput({author:activeUser.username, title:'', body:'', topic:'coding', article_img_url:''})
        })
    }

    function handleCreateTopic (event) {
        event.preventDefault()
        postTopic(newTopicInput).then((newTopic)=> {
            setAlertMessage('Topic Created!')
            setShowAlertMessage(true)
               setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
            setTopics([newTopic, ...topics])
        }).catch((err) => {
            setAlertMessage('Error posting topic, please try again later')
            setShowAlertMessage(true)
            setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
        }).finally(()=>{
            setNewTopicInput({slug:'', description:''})
            setIsNewTopic(false)
            setIsChecked(false)
        })
    }

    function handleCheckboxChange (event) {
        setIsNewTopic(event.target.checked)
        setIsChecked(event.target.checked)
    }

    if (isLoading) {
        return (
            <div className="spinner">
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
        )
    }

    return (
        <section className="flex flex-col place-items-center">
            <SuccessAlert showAlertMessage={showAlertMessage} alertMessage={alertMessage}/>
            <h2 className="font-bold text-[1.5rem] pb-5">New Article</h2>
            <form className="flex flex-col w-[80vw]" onSubmit={handleSubmit}>
                <label>Title *</label>
                <input type="text" placeholder="Title" className="input input-bordered border-[#DD3232]  border-2" maxLength="75"
                onChange={handleChange}
                name="title"
                required
                value={newArticleInput.title}
                />
                <label className="mt-5">Article *</label>
                <textarea className="textarea textarea-lg h-[20rem] border-[#DD3232] mb-7  border-2" placeholder="Article"
                onChange={handleChange}
                name="body"
                required
                value={newArticleInput.body}
                />
                <label>Topic</label>
                <select className="p-2 border-[#DD3232] border-2 rounded-lg dark:bg-[#282a36] bg-white"
                onChange={handleChange}
                name="topic"
                value={newArticleInput.topic}>
                    {topics.map((topic) => {
                        return  <option value={topic.slug}
                        key={topic.slug}>{capitaliseStr(topic.slug)}</option>
                    })}
                </select>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Create a new topic?</span>
                        <input type="checkbox" className="checkbox checkbox-error" onChange={handleCheckboxChange} checked={isChecked} />
                    </label>
                </div>
                {isNewTopic ? <><label className="mt-5">New Topic</label>
                <input type="text" placeholder="New Topic" className="input input-bordered border-primary border-2" maxLength="75"
                onChange={handleNewTopic}
                name="slug"
                required
                value={newTopicInput.slug}
                />
                <label className="mt-5">New Topic's Description</label>
                <input type="text" placeholder="Description" className="input input-bordered border-primary  border-2" maxLength="75"
                onChange={handleNewTopic}
                name="description"
                required
                value={newTopicInput.description}
                />
                <button onClick={handleCreateTopic} className='overflow-hidden p-2 mt-2 cursor-pointer rounded-lg bg-primary text-white'>Create New Topic</button>
                </>: null}
                <label className="mt-5">Image URL</label>
                <input type="url" placeholder="Image URL" className="input input-bordered border-[#DD3232]  border-2 mb-8" maxLength="75"
                onChange={handleChange}
                name="article_img_url"
                value={newArticleInput.article_img_url}
                />
                <button type="submit" disabled={isNewTopic}
                className='mb-[3rem] p-3 rounded-lg bg-[#DD3232] text-white' >Post</button>
            </form>
        </section>
    )
}
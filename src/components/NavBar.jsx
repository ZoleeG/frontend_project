import '../styles/NavBar.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchTopics } from '../../utils/api.js'
import { capitaliseStr } from '../../utils/capitaliseStr'

export default function NavBar({setPage, limit, sortBy, order, searchParams, setSearchParams}) {

    const [topics, setTopics] = useState([])

    const params={}
    params.sort_by = sortBy ? sortBy : "created_at"
    params.order = order ? order : "desc"
    params.limit = limit ? limit : 10
    
    useEffect(() => {
        fetchTopics().then((topicData) => {
            setTopics(topicData)
        })
    }, [])

    function handleClick() {
        setPage(1)
        setSearchParams(params)
    }

    return (
        <>
            <nav>
                <ul>
                    {topics.map((topic) => {
                        return <NavLink className='nav-link dark:text-[#f8f8f2] dark:hover:text-[#47acaf]' to={`/topics/${topic.slug}`} key={topic.slug} onClick={handleClick}><li>{capitaliseStr(topic.slug)}</li></NavLink>
                    })}
                </ul>
            </nav>
        </>
    )
}
import { useParams } from 'react-router-dom';
import { useState } from "react";
import styles from "./SelectedArticleScreen.module.css";
import Comments from "./sub-components/Comments"
import SelectedArticle from './sub-components/SelectedArticle';
import NavBar2 from "./sub-components/NavBar2";
import Header from "./sub-components/Header";

const SelectedArticleScreen = ({votes, isLoading, setIsLoading}) => {
    const { article_id } = useParams()
    const [comments, setComments] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    return <div className={styles.grid_container}>
        <div className={styles.header}><Header /></div>
        <div className={styles.navbar}><NavBar2 /></div>
        <div className={styles.articles}><SelectedArticle setComments={setComments} article_id={article_id} votes={votes} isLoading={isLoading} setIsLoading={setIsLoading} isOpen={isOpen} setIsOpen={setIsOpen}/></div>
        <div className={styles.comments}><Comments isOpen={isOpen} comments={comments} article_id={article_id} isLoading={isLoading}/></div>
        </div>
}

export default SelectedArticleScreen
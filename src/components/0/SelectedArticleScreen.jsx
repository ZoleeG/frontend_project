import { useParams } from 'react-router-dom';
import { useState } from "react";
import styles from "./SelectedArticleScreen.module.css";
import SelectedArticle from '../1/SelectedArticle';
import ArticleInfoNavBar from "../1/ArticleInfoNavBar";
import Header from "../1/Header";

const SelectedArticleScreen = ({votes}) => {

    const { article_id } = useParams()
    

    return <div className={styles.grid_container}>
        <Header className={styles.header} />
        <ArticleInfoNavBar className={styles.navbar} />
        <SelectedArticle className={styles.articles} article_id={article_id} votes={votes} />
        </div>
}

export default SelectedArticleScreen
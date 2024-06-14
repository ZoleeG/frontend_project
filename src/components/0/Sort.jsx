import React from 'react'
import ArticleInfoNavBar from '../1/ArticleInfoNavBar'
import Header from '../1/Header'
import SortList from '../1/SortList'
import styles from "./SelectedArticleScreen.module.css";

const Sort = () => {
  return (
    <div className={styles.grid_container}>
      <Header className={styles.header} />
      <ArticleInfoNavBar className={styles.navbar} />
      <SortList className={styles.articles} />
    </div>
  )
}

export default Sort
import React from "react";
import styles from "./SelectedArticleScreen.module.css";
import ArticleInfoNavBar from "../1/ArticleInfoNavBar";
import Header from "../1/Header";
import TopicsList from "../1/TopicsList";

const Topics = () => {
  return (
    <div className={styles.grid_container}>
      <Header className={styles.header} />
      <ArticleInfoNavBar className={styles.navbar} />
      <TopicsList className={styles.articles} />
    </div>
  );
};

export default Topics;

import React, { useEffect, useState } from "react";
import { fetchTopics } from "../../../utils/api";
import ErrorPage from "../0/ErrorPage";
import { Link } from "react-router-dom";
import styles from "./TopicsList.module.css"

const TopicsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErr] = useState(null);
  const [topics, setTopics] = useState("topics");

  useEffect(() => {
    setIsLoading(true);
    fetchTopics()
      .then((topics) => {
        setIsLoading(false);
        setTopics(topics);
      })
      .catch((err) => {
        setErr({ err });
      })
      .finally(() => {});
  }, []);

  if (error) {
    return <ErrorPage message={error.err.message} />;
  }

  return isLoading ? (
    <div className={styles.loading_symbol}>
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
  ) : (
    <ol className={styles.body}>
        <h1>Topics</h1>
      {topics.map((topic) => {
        const { slug, description } = topic;
        return (
          <li id={slug} key={slug}>
            <Link to={`/topics/${slug}`} className={styles.tooltip} > {slug}<span className={styles.tooltiptext}>{description}</span></Link>
          </li>
        );
      })}
    </ol>
  );
};

export default TopicsList;

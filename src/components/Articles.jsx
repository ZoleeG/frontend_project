import { lineSpinner } from "ldrs";
import { useState, useEffect } from "react";
import {
  fetchArticles,
  fetchTopics,
  getTotalArticles,
} from "../../utils/api.js";
import ErrorPage from "./ErrorPage.jsx";
import BasicPagination from "./BasicPagination.jsx";
import SortingOptions from "./SortingOptions.jsx";
import ArticleCard from "./ArticleCard.jsx";
import "../styles/Articles.css";
import { useParams, useSearchParams } from "react-router-dom";
import FloatingActionBtn from "./FloatingActionBtn.jsx";
import SuccessAlert from "./SuccessAlert.jsx";

lineSpinner.register();

export default function Articles({
  limit,
  setLimit,
  setSortBy,
  sortBy,
  setOrder,
  order,
  page,
  setPage,
  articles,
  setArticles,
}) {

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by") || sortBy;
  const orderQuery = searchParams.get("order") || order;
  const limitQuery = searchParams.get("limit") || limit || 10
  const topicQuery = useParams().topic || searchParams.get("topic")

  const [articleCount, setArticleCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getTotalArticles(topicQuery).then((total) => {
      setTotalPages(Math.ceil(total / limitQuery))
      setArticleCount(total)})
    
    Promise.all([
      fetchArticles(topicQuery, sortByQuery, orderQuery, limitQuery, page),
      fetchTopics(),
    ])
      .then(([fetchedArticles, fetchedTopics]) => {
        setArticles(fetchedArticles);
        setTopics(fetchedTopics);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr({ err });
      })
      .finally(() => {
        if (
          topicQuery &&
          !topics
            .map((element) => {
              return element.slug;
            })
            .includes(topicQuery)
        ) {
          return <ErrorPage />;
        }
        if (error) {
          return <ErrorPage message={error.err.message} />;
        }
      });
  }, [page, topicQuery, limitQuery, orderQuery, sortByQuery]);

  return isLoading ? (
    <div className="spinner">
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
  ) : (
    <>
      <SuccessAlert
        showAlertMessage={showAlertMessage}
        alertMessage={alertMessage}
      />
      <SortingOptions
        setSearchParams={setSearchParams}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        topics={topics}
        setSortBy={setSortBy}
        sortBy={sortBy}
        setOrder={setOrder}
        order={order}
        topicQuery={topicQuery}
      />
      <ul className="px-[1rem]">
        {articles.map((article) => {
          return (
            <div id={article.article_id} key={article.article_id}>
              <ArticleCard articleCount={articleCount} setArticleCount={setArticleCount} article={article} setShowAlertMessage={setShowAlertMessage} setAlertMessage={setAlertMessage} articles={articles} setArticles={setArticles} />
            </div>
          );
        })}
      </ul>
      <BasicPagination
        sortBy={sortBy}
        order={order}
        limit={limit}
        setSearchParams={setSearchParams}
        setPage={setPage}
        page={page}
        totalPages={totalPages}
      />
      <div className="fixed bottom-5 right-5 p-[1rem]">
        <FloatingActionBtn />
      </div>
    </>
  );
}

import styles from "./HomeScreen.module.css";
import Articles from "../1/Articles";
import NavBar from "../1/NavBar";
import Header from "../1/Header";
import { useParams, useSearchParams } from "react-router-dom";

const HomeScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by") || "created_at";
  const orderQuery = searchParams.get("order") || "asc";
  const limitQuery = searchParams.get("limit") || 10;
  const pageQuery = searchParams.get("p") || 1;
  const topic = searchParams.get("topic");

  return (
    <div className={styles.grid_container}>
      <Header className={styles.header} />
      <NavBar className={styles.navbar} />
      <article className={styles.articles}>
        <Articles
          selectedTopic={topic}
          sortByQuery={sortByQuery}
          orderQuery={orderQuery}
          limitQuery={limitQuery}
          pageQuery={pageQuery}
        />
      </article>
    </div>
  );
};

export default HomeScreen;

import { useParams } from 'react-router-dom';
import styles from "./HomeScreen.module.css";
import SelectedArticle from './sub-components/SelectedArticle';
import NavBar2 from "./sub-components/NavBar2";
import Header from "./sub-components/Header";

const SelectedArticleScreen = ({votes, loading, setLoading}) => {
    const { article_id } = useParams()
    return <div className={styles.grid_container}>
        <div className={styles.header}><Header /></div>
        <div className={styles.navbar}><NavBar2 /></div>
        <div className={styles.articles}><SelectedArticle article_id={article_id} votes={votes} loading={loading} setLoading={setLoading}/></div>
        </div>
}

export default SelectedArticleScreen
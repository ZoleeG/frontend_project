import { Routes, Route } from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import UserProvider from "./context/UserProvider.jsx"
import Header from "./components/Header.jsx";
import Articles from "./components/Articles.jsx";
import NavBar from "./components/NavBar.jsx";
import { createTheme, ThemeProvider } from '@mui/material';
import Users from "./components/Users.jsx";
import { useState } from 'react'
import { useSearchParams } from "react-router-dom";
import ArticleById from "./components/ArticleById.jsx";
import Bookmark from "./components/Bookmark.jsx"
import { PostArticle } from "./components/PostArticle.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#757de8',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

function App() {

  const [sortBy, setSortBy] = useState();
  const [order, setOrder] = useState();
  const [limit, setLimit] = useState();

  const [bookmarked, setBookmarked] = useState([])
  const [page, setPage] = useState(1)
  const [articles, setArticles] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();

  return (
  <ThemeProvider theme={theme}>
  <UserProvider>
    <Header />
    <NavBar setPage={setPage} sortBy={sortBy} order={order} limit={limit} searchParams={searchParams} setSearchParams={setSearchParams} />
    <Routes>
      <Route path="/" element={<Articles articles={articles} setArticles={setArticles} setPage={setPage} page={page} sortBy={sortBy} order={order} limit={limit} setSortBy={setSortBy} setOrder={setOrder} setLimit={setLimit} searchParams={searchParams} setSearchParams={setSearchParams} />}/>
      <Route path="/:article_id" element={<ArticleById bookmarked={bookmarked} setBookmarked={setBookmarked} />} />
      <Route path="/topics/:topic" element={<Articles searchParams={searchParams} setSearchParams={setSearchParams} articles={articles} setArticles={setArticles} setPage={setPage} page={page} sortBy={sortBy} order={order} limit={limit} setSortBy={setSortBy} setOrder={setOrder} setLimit={setLimit} />} />
      <Route path="/articles" element={<Articles searchParams={searchParams} setSearchParams={setSearchParams} articles={articles} setArticles={setArticles} setPage={setPage} page={page} sortBy={sortBy} order={order} limit={limit} setSortBy={setSortBy} setOrder={setOrder} setLimit={setLimit} />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/bookmarked" element={<Bookmark bookmarked={bookmarked} setBookmarked={setBookmarked}/>} />
      <Route path="/articles/upload" element={<PostArticle articles={articles} setArticles={setArticles}/>}/>
    </Routes>
  </UserProvider>
  </ThemeProvider>
  )
}

export default App

import { Routes, Route } from "react-router-dom";
import SelectedArticleScreen from './components/0/SelectedArticleScreen'
import HomeScreen from './components/0/HomeScreen';
import ErrorPage from './components/0/ErrorPage';
import './App.css'
import PostComment from './components/0/PostComment';
import {ThemeProvider} from "./context/Theme"
import Topics from "./components/0/Topics";
import Sort from "./components/0/Sort";

function App() {

  return (
  <ThemeProvider>
    <Routes>
      <Route path="/" element={<HomeScreen />}/>
      <Route path="/:article_id" element={<SelectedArticleScreen />} />
      <Route path="/:article_id/add_comment" element={<PostComment />} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/topics/:topic" element={<HomeScreen />} />
      <Route path="/sort" element={<Sort />} />
      <Route path="/articles" element={<HomeScreen />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </ThemeProvider>
  )
}

export default App

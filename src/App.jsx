import { Routes, Route } from "react-router-dom";
import SelectedArticleScreen from './components/0/SelectedArticleScreen'
import HomeScreen from './components/0/HomeScreen';
import ErrorPage from './components/0/ErrorPage';
import { useState, useParams } from 'react'
import './App.css'
import PostComment from './components/0/PostComment';
import {ThemeProvider} from "./context/Theme"

function App() {

  return (
  <ThemeProvider>
    <Routes>
      <Route path="/" element={<HomeScreen />}/>
      <Route path="/:article_id" element={<SelectedArticleScreen />} />
      <Route path="/:article_id/add_comment" element={<PostComment />} />
      <Route path="*" element={ErrorPage} />
    </Routes>
  </ThemeProvider>
  )
}

export default App

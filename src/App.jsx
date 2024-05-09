import { Routes, Route } from "react-router-dom";
import SelectedArticleScreen from './components/0/SelectedArticleScreen'
import HomeScreen from './components/0/HomeScreen';
import ErrorPage from './components/0/ErrorPage';
import { useState, useParams } from 'react'
import './App.css'
import PostComment from './components/0/PostComment';

function App() {

  return <>
    <Routes>
      <Route path="/" element={<HomeScreen />}/>
      <Route path="/:article_id" element={<SelectedArticleScreen />} />
      <Route path="/:article_id/add_comment" element={<PostComment />} />
      <Route path="*" element={ErrorPage} />
    </Routes>
    </>
}

export default App

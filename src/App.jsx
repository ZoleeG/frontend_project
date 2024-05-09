import { Routes, Route } from "react-router-dom";
import SelectedArticleScreen from './components/0/SelectedArticleScreen'
import HomeScreen from './components/0/HomeScreen';
import ErrorPage from './components/0/ErrorPage';
import { useState } from 'react'
import './App.css'

function App() {
  
  return <>
    <Routes>
      <Route path="/" element={<HomeScreen />}/>
      <Route path="/:article_id" element={<SelectedArticleScreen />}/>
      <Route path="*" element={ErrorPage} />
    </Routes>
    </>
}

export default App

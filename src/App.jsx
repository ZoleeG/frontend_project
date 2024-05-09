import { Routes, Route } from "react-router-dom";
import SelectedArticleScreen from './components/0/SelectedArticleScreen'
import HomeScreen from './components/0/HomeScreen';
import { useState } from 'react'
import './App.css'

function App() {

  const [votes, setVotes] = useState()
  
  return <>
    <Routes>
      <Route path="/" element={<HomeScreen votes={votes} />}/>
      <Route path="/:article_id" element={<SelectedArticleScreen votes={votes} />}/>
    </Routes>
    </>
}

export default App

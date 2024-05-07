import { Routes, Route } from "react-router-dom";
import SelectedArticleScreen from '../components/SelectedArticleScreen'
import HomeScreen from '../components/HomeScreen';
import { useState } from 'react'
import './App.css'

function App() {

  const [votes, setVotes] = useState()
  const [loading, setLoading] = useState(true);
 

  return <>
    <Routes>
      <Route path="/" element={<HomeScreen setVotes={setVotes} loading={loading} setLoading={setLoading}/>}/>
      <Route path="/:article_id" element={<SelectedArticleScreen votes={votes} loading={loading} setLoading={setLoading}/>}/>
    </Routes>
    </>
}

export default App

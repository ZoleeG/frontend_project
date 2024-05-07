import { Routes, Route } from "react-router-dom";
import SelectedArticleScreen from '../components/SelectedArticleScreen'
import HomeScreen from '../components/HomeScreen';
import { useState } from 'react'
import './App.css'

function App() {

  const [votes, setVotes] = useState()
  const [isLoading, setIsLoading] = useState(true);
 

  return <>
    <Routes>
      <Route path="/" element={<HomeScreen setVotes={setVotes} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
      <Route path="/:article_id" element={<SelectedArticleScreen votes={votes} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
    </Routes>
    </>
}

export default App

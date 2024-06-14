import React, { useState } from 'react'
import styles from "./TopicsList.module.css"
import { Link } from "react-router-dom";

const SortList = () => {
    const [order, setOrder] = useState('asc')
  return (
    <ol className={styles.body}>
        <h1>Sort Articles By</h1>
          <li id='votes' key='votes'>
            <Link to={`/articles?sort_by=votes&order=${order}`} className={styles.tooltip} >Votes <span className={styles.tooltiptext}>SortBy Votes</span></Link>
          </li>
          <li id='date' key='date'>
            <Link to={`/articles?sort_by=created_at&order=${order}`} className={styles.tooltip} >Date <span className={styles.tooltiptext}>SortBy Date</span></Link>
          </li>
          <li id='comment_count' key='comment_count'>
            <Link to={`/articles?sort_by=comment_count&order=${order}`} className={styles.tooltip} >Comment count <span className={styles.tooltiptext}>SortBy Comment count</span></Link>
          </li>
          <h1>Order</h1>
          <li id='asc' key='asc'>
            <button disabled={order==='asc' ? true : false} onClick={()=>{setOrder('asc')}}>ascending</button>
            <button disabled={order==='desc' ? true : false} onClick={()=>{setOrder('desc')}}>descending</button>
          </li>
    </ol>
  )
}

export default SortList
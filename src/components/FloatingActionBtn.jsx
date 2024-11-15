import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider.jsx";

export default function FloatingActionBtn() {

  const { activeUser } = useContext(UserContext);

  return activeUser ? 
      (<Link to='/articles/upload'>
        <Fab size="large" color="primary" aria-label="add">
        <AddIcon />
        </Fab>
      </Link>) :
        <Link to='#'>
        <Fab size="large" color="primary" aria-label="add">
        <AddIcon />
        </Fab>
        </Link>
  ;
}
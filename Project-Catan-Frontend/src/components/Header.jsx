import React from "react";
import { useNavigate } from "react-router-dom";
import classes from './Header.module.css'
import {MdMessage} from 'react-icons/md';

const Header = ({ title }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  return (
    <header className={classes.header}>
    <h1 className={classes.logo}>
      <MdMessage />
      {title}
    </h1>
      {/* {localStorage.getItem("token") ? ( */}
        <p>
        <button onClick={() => navigate('/')} className={classes.button} >Home</button>
        <button onClick={() => navigate('/players')} className={classes.button} >Players</button>
        <button onClick={() => navigate('/abundances')} className={classes.button} >Abundances</button>
        <button onClick={() => navigate('/futures')} className={classes.button} >Futures</button>
        <button onClick={() => navigate('/options')} className={classes.button} >Options</button>
        <button onClick={() => navigate('/admin')} className={classes.button} >ADMIN</button>
        {token ? (
        <button onClick={handleLogout} className={classes.button}>Logout</button>
        ) : (
        <button onClick={handleLogin} className={classes.button}>Login</button>
        )}
        </p>
      {/* ) : null} */}
    </header>
  );
};

export default Header;

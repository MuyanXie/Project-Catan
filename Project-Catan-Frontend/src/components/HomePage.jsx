import React from 'react';
import { Link } from 'react-router-dom';
import logo from './CTS.png';
import classes from './HomePage.module.css';

function HomePage() {
  return (
    <div style={{textAlign: 'center'}}>

      <img src={logo} alt="logo" style={{maxWidth: '40%'}} />

      <br />
      <br />
      <Link to="/register">
        <button className={classes.btn}>Participate!</button>
      </Link>
    </div>
  );
}

export default HomePage;

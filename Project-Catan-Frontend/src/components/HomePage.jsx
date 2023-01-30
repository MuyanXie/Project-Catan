import React from 'react';
import logo from './CTS.png';
import classes from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{textAlign: 'center'}}>

      <img src={logo} alt="logo" style={{maxWidth: '40%'}} />

      <br />
      <br />

      <br />
      <br />
      <br />
      <br />

        <p className={classes.header}><button className={classes.btn} onClick={() => navigate('/register')}>Participate!</button>
        <button className={classes.btn} onClick={() => navigate('/signin')}>Or, Login!</button></p>

    </div>
  );
}

export default HomePage;

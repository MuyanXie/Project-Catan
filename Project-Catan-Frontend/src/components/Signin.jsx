import React, { useState } from 'react';
import axios from 'axios';
import classes from './Signin.module.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/player/${name}/${code}/signin`);
      console.log(response.status)
      if (response.status === 202) {
        // Save the token to local storage if the response is successful

        localStorage.setItem('token', JSON.stringify(response.data));

        navigate('/players')
      }
    } catch (error) {

      setError('Not in record!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className = {classes.form}>
      <h1 className={classes.head}>Sign In!</h1>
        {error && <p className={classes.label}>{error}</p>}
        <label htmlFor="name" className={classes.label} >Name:</label>
        <input className={classes.input} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <br /> 

        <label htmlFor="code" className={classes.label} >Password:</label>
        <input className={classes.input} type="password" id="code" value={code} onChange={(e) => setCode(e.target.value)} />

        <br /> 
        <br />
        <button type="submit" className={classes.btn}>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;

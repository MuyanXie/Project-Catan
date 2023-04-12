import React, { useState } from 'react';
import axios from 'axios';
import classes from './Signin.module.css';
import { useNavigate } from 'react-router-dom';
import api_url from "../config/config.js";

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }
  const [errors, setErrors] = useState({});
  const handleSubmit = async (event) => {
    let formErrors = {};
    if(formData.name === "ADMIN"){
      formErrors.name = "ADMIN Root Unsignable!"
    }
    event.preventDefault();
    try {
      const response = await axios.get(`${api_url}/player/${formData.name}/${formData.code}/signin`);
      if (response.status === 202) {
        const temp = response.data
        temp.code = formData.code
        localStorage.setItem('token', JSON.stringify(temp));
        navigate('/players')
      }
    } catch (error) {
      formErrors.login = "Not in Record!"
    }
    setErrors(formErrors);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className = {classes.form}>
      <h1 className={classes.head}>Sign In!</h1>
        {errors.login && <p className={classes.label}>{errors.login}</p>}
        <label htmlFor="name" className={classes.label} >Name:</label>
        <input className={classes.input} type="text" name = "name" onChange={handleChange} />
        <br />
        {errors.name && <p className={classes.label}>{errors.name}</p>}
        <br /> 
        <label htmlFor="code" className={classes.label} >Password:</label>
        <input className={classes.input} type="password" name = "code" onChange={handleChange} />
        <br /> 
        <br />
        <button type="submit" className={classes.btn}>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;

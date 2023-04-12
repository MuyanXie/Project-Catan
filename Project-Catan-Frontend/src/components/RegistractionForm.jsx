import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './RegistrationForm.module.css';
import api_url from "../config/config.js";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    passwordConfirm: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit =async (event) => {
    event.preventDefault();
    let formErrors = {};

    if (!formData.name) {
      formErrors.name = 'Name is required';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    }

    if (formData.password !== formData.passwordConfirm) {
      formErrors.passwordConfirm = 'Passwords do not match';
    }

    if (Object.keys(formErrors).length === 0) {
        try {
            const selectedData = {name : formData.name, code : formData.password}
            const response = await axios.post(`${api_url}/player`, selectedData);
            const temp = response.data
            temp.code = formData.password
            if (response.status === 201) {
                if(formData.name === "ADMIN"){
                  setTimeout(() => {
                    navigate("/")
                  }, 2000);
                }
                else{
                  localStorage.setItem("token", JSON.stringify(temp))
                  navigate('/players');
                }
            }
          } 
          catch (error) {
            if (error.response.status === 409 & formData.name === "ADMIN"){
              formErrors.admin = "ADMIN already exists!";
            }
            else if(error.response.status === 409){
              formErrors.admin = "Username already exists!"
            }
          }
        }
    setErrors(formErrors);
        
  }

  return (

    <form onSubmit={handleSubmit} className = {classes.form}>
    <h1 className={classes.head}>Register!</h1>
      <label className={classes.label}>
        Name:
        <br />
        <br />
        <input type="text" name="name" onChange={handleChange} />
        {errors.name && <p>{errors.name}</p>}
      </label>
      <br />
      <label className={classes.label}>
        Password:
        <br />
        <br />
        <input type="password" name="password" onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
      </label>
      <br />
      <label className={classes.label}>
        Confirm Password:
        <br /> 
        <br />
        <input type="password" name="passwordConfirm" onChange={handleChange} />
        {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
        {errors.admin && <p>{errors.admin}</p>}
      </label>
      <br />
      <button type="submit" className={classes.btn}>Register</button>

    </form>
  );
  }

export default RegisterForm;

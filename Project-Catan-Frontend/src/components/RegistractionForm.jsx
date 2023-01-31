import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './RegistrationForm.module.css';

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

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
        try {
            const selectedData = {name : formData.name, code : formData.password}
            const response = await axios.post('http://localhost:8080/player', selectedData);
            console.log(response)
            if (response.status === 201) {
                localStorage.setItem("token", JSON.stringify(response.data))
                navigate('/players');
            }
          } 
          catch (error) {
            console.log(error);
          }
        }
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
      </label>
      <br />
      <button type="submit" className={classes.btn}>Register</button>
    </form>
  );
  }

export default RegisterForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import classes from './DeleteFuture.module.css';
import Header from "./Header";
import api_url from "../config/config.js";

const DeleteFuture = () => {
  const [formData, setFormData] = useState({
    code: '',
    confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const futureid = params.get('futureid');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit =async (event) => {
    event.preventDefault();
    let formErrors = {};
    if (!formData.confirmation) {
        formErrors.confirmation = 'Do not leave it blank!';
      }
      if (!formData.code) {
        formErrors.code = 'Do not leave it blank!';
      }

    if (Object.keys(formErrors).length === 0) {
        try {
            const playerid = JSON.parse(localStorage.getItem("token")).id
            const response = await axios.delete(`${api_url}/player/${playerid}/futures/${futureid}/${formData.code}`);
            if (response.status === 200) {
                navigate('/admin');
            }
          } 
        catch (error) {
            formErrors.code = 'Wrong Password!'
          }
    }
    setErrors(formErrors);

  }
  return (
    <>
    <Header title="Delete..." />
    <form onSubmit={handleSubmit} className = {classes.form}>
    <button onClick={() => navigate('/admin')} className = {classes.backbtn}>Back to Control Panel...</button>
    <h1 className={classes.head}>Delete Future!</h1>

    <label htmlFor="code" className={classes.label} >Enter Admin Password:</label>
        <input className={classes.input} type="password" name = "code" onChange={handleChange} />
        {errors.code && <p>{errors.code}</p>}

    <br ></br>
        <label htmlFor="confirmation" className={classes.label} >Please Confirm:</label>
        <select id = "confirmation" name="confirmation" onChange={handleChange} className={classes.dropdown}>
          <option value="">Please Select...</option>
          <option value ='Yes'>Yes, I confirm to change the turn!</option>
        </select>
        {errors.confirmation && <p>{errors.confirmation}</p>}
    <br></br>
      <button type="submit" className={classes.btn}>Submit!</button>
    </form>
    </>
  );
  
  };
export default DeleteFuture;
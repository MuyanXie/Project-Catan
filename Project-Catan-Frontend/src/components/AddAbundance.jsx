import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './AddAbundance.module.css';
import Header from "./Header";

const AddAbundance = () => {
  const [formData, setFormData] = useState({
    stuff: '',
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
    if (!formData.stuff) {
      formErrors.stuff = 'Do not leave it blank!';
    }
    if (Object.keys(formErrors).length === 0) {
        try {
            const selectedData = {stuff : formData.stuff, id: JSON.parse(localStorage.getItem("token")).id}
            const code = JSON.parse(localStorage.getItem("token")).code
            const response = await axios.post(`http://localhost:8080/player/${selectedData.id}/abundances/${code}`, selectedData);
            if (response.status === 201) {
                navigate('/abundances');
            }
          } 
        catch (error) {
            if (error instanceof TypeError || error.response.status === 500){
              localStorage.clear();
              formErrors.unknown = "Cookies Error, Plase Re-login..."
              setTimeout(() => {
                navigate("/signin")
              }, 2000);
            }
            else if(error.response.status === 401){
              localStorage.clear();
              formErrors.unauthorized = "Verification Failed, Plase Re-login..."
              setTimeout(() => {
                navigate("/signin")
              }, 2000);
            }
            else if(error.response.status === 409){
              formErrors.conflict = "Abundance Already Exist!"
            }
          }
    }
    setErrors(formErrors);

  }
  return (
    <>
    <Header title="Add..." />
    <form onSubmit={handleSubmit} className = {classes.form}>
    <h1 className={classes.head}>Add Abundance...</h1>
      {errors.unauthorized && <p className={classes.label}>{errors.unauthorized}</p>}
      {errors.unknown && <p className={classes.label}>{errors.unknown}</p>}
      {errors.conflict && <p className={classes.label}>{errors.conflict}</p>}
      <label className={classes.label}>
        What do you wish to offer?
        <br />
        <br />
        <input type="text" name="stuff" onChange={handleChange} />
        {errors.stuff && <p>{errors.stuff}</p>}
      </label>
      <br />
      <button type="submit" className={classes.btn}>Add it!</button>
    </form>
    </>
  );
  
  };
export default AddAbundance;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './AddAbundance.module.css';
import Header from "./Header";

const AddFutures = () => {
  const [formData, setFormData] = useState({
    "initiatorId": JSON.parse(localStorage.getItem("token")).id,
    "acceptorId" : "",
    "initiatorItems": "",
    "acceptorItems" : "",
    "activeTurn" : "",
    "initiatorCollateral" : "",
    "acceptorCollateral" : "",
    "status" : "-1"
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
            const playerId = JSON.parse(localStorage.getItem("token")).id
            const response = await axios.post(`http://localhost:8080/player/${playerId}/abundances/${code}`, selectedData);
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
    <button onClick={() => navigate('/abundances')} className = {classes.backbtn}>Back to Futures...</button>
    <h1 className={classes.head}>Add Future Trade...</h1>
      {errors.unauthorized && <p className={classes.label}>{errors.unauthorized}</p>}
      {errors.unknown && <p className={classes.label}>{errors.unknown}</p>}
      {errors.conflict && <p className={classes.label}>{errors.conflict}</p>}
      <label className={classes.label}>
        What do you wish to offer?
        <br />
        <br />
        <select id = "stuff" name="stuff" onChange={handleChange} className={classes.dropdown}>
          <option value="">Please Select...</option>
          <option value ='Ore'>Ore</option>
          <option value ='Wool'>Wool</option>
          <option value ='Brick'>Brick</option>
          <option value ='Lumber'>Lumber</option>
          <option value ='Grain'>Grain</option>
        </select>
        {/* <input type="text" name="stuff" onChange={handleChange} /> */}
        {errors.stuff && <p>{errors.stuff}</p>}
      </label>
      <br />
      <button type="submit" className={classes.btn}>Add it!</button>
    </form>
    </>
  );
  
  };
export default AddFutures;
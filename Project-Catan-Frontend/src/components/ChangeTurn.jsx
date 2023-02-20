import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import classes from './ChangeTurn.module.css';
import Header from "./Header";

const ChangeTurn = () => {
  const [formData, setFormData] = useState({
    turn: '',
    code: '',
    confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const curturn = params.get('curturn');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit =async (event) => {
    event.preventDefault();
    let formErrors = {};
    if (!formData.turn) {
      formErrors.turn = 'Do not leave it blank!';
    }
    if (!formData.confirmation) {
        formErrors.confirmation = 'Do not leave it blank!';
      }
      if (!formData.code) {
        formErrors.code = 'Do not leave it blank!';
      }

    if (Object.keys(formErrors).length === 0) {
        try {
            const response = await axios.put(`http://localhost:8080/player/changeTURN/${formData.code}/${formData.turn}`);
            if (response.status === 202) {
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
    <Header title="Update..." />
    <form onSubmit={handleSubmit} className = {classes.form}>
    <button onClick={() => navigate('/admin')} className = {classes.backbtn}>Back to Control Panel...</button>
    <h1 className={classes.head}>Change Turn!</h1>
    <h2 className={classes.head2}>The current turn is {curturn}</h2>
      {errors.unauthorized && <p className={classes.label}>{errors.unauthorized}</p>}
      {errors.unknown && <p className={classes.label}>{errors.unknown}</p>}
      {errors.conflict && <p className={classes.label}>{errors.conflict}</p>}

      <label htmlFor="turn" className={classes.label} >What's the new turn?</label>
        <input className={classes.input} type="text" name = "turn" onChange={handleChange} />
        {errors.turn && <p>{errors.turn}</p>}

      <br />


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
export default ChangeTurn;
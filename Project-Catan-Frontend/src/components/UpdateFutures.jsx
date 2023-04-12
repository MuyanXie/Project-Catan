import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './UpdateFutures.module.css';
import { useLocation } from 'react-router-dom';
import Header from "./Header";
import api_url from "../config/config.js";

const UpdateFutures = () => {
  const location = useLocation();
  const needChangeFutures = location.state.needUpdateFutures;
  const [formData, setFormData] = useState({
    "id": needChangeFutures.id,
    "initiatorId": needChangeFutures.initiatorId,
    "acceptorId" : needChangeFutures.acceptorId,
    "initiatorItems": needChangeFutures.initiatorItems,
    "acceptorItems" : needChangeFutures.acceptorItems,
    "activeTurn" : needChangeFutures.activeTurn,
    "initiatorCollateral" : needChangeFutures.initiatorCollateral,
    "acceptorCollateral" :  needChangeFutures.acceptorCollateral,
    "status" : needChangeFutures.status,
    "authorizationCode" : ""
  });

  const [errors, setErrors] = useState({});
  const [players, setPlayers] = useState([]);

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
    if (!formData.acceptorId) {
      formErrors.acceptorId = 'Do not leave it blank!';
    }

    if (!formData.initiatorItems) {
      formErrors.initiatorItems = 'Do not leave it blank!';
    }

    if (!formData.initiatorCollateral) {
      formErrors.initiatorCollateral = 'Do not leave it blank!';
    }

    if (!formData.acceptorItems) {
      formErrors.acceptorItems = 'Do not leave it blank!';
    }

    if (!formData.acceptorCollateral) {
      formErrors.acceptorCollateral = 'Do not leave it blank!';
    }

    if (!formData.acceptorId){
        formErrors.acceptorId = 'Do not leave it blank!';
    }

    if (!formData.activeTurn) {
      formErrors.activeTurn = 'Do not leave it blank!';
    }

    if (!formData.status) {
        formErrors.status = 'Do not leave it blank!';
    }

    if (!formData.id) {
        formErrors.id = 'Do not leave it blank!';
    }

    if (Object.keys(formErrors).length === 0) {
        try {
            const code = formData.authorizationCode
            const playerId = JSON.parse(localStorage.getItem("token")).id
            const response = await axios.put(`${api_url}/player/${playerId}/futures/${formData.id}/generalupdatefutures/${code}`, formData);
            if (response.status === 200) {
                navigate('/admin');
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
          }
    }
    setErrors(formErrors);
  }

  useEffect(() => {
    const fetchAllPlayers = async () => {
      const response = await fetch(`${api_url}/player/all`);
      const data = await response.json();
      setPlayers(data);
    };

    fetchAllPlayers();
  }, []);

  return (
    <>
    <Header title="Modify Futures..." />
    <form onSubmit={handleSubmit} className = {classes.form}>
    <button onClick={() => navigate('/admin')} className = {classes.backbtn}>Back to Admin...</button>
    <h1 className={classes.head}>Update Future Trade...</h1>
      {errors.unauthorized && <p className={classes.label}>{errors.unauthorized}</p>}
      {errors.unknown && <p className={classes.label}>{errors.unknown}</p>}

      <label className={classes.label}>
        Initiator Name:
        <br/>
        <select id = "initiatorId" name="initiatorId" onChange={handleChange} className={classes.dropdown}>
          <option defaultValue={needChangeFutures.initiatorId}>Don't Change</option>
          {players
          .filter((player) => player.name !== "ADMIN")
          .map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        </label>
        {errors.acceptorId && <p>{errors.acceptorId}</p>}

        <label htmlFor="initiatorItems" className={classes.label} >Your Items to Offer:</label>
        <input className={classes.input} type="text" name = "initiatorItems" onChange={handleChange} defaultValue={needChangeFutures.initiatorItems}/>
        {errors.initiatorItems && <p>{errors.initiatorItems}</p>}

        <label htmlFor="initiatorCollateral" className={classes.label} >Your Collaterals to Offer:</label>
        <input className={classes.input} type="text" name = "initiatorCollateral" onChange={handleChange} defaultValue = {needChangeFutures.initiatorCollateral} />
        {errors.initiatorCollateral && <p>{errors.initiatorCollateral}</p>}

        <label className={classes.label}>
        Acceptor Name:
        <br/>
        <select id = "acceptorId" name="acceptorId" onChange={handleChange} className={classes.dropdown}>
        <option defaultValue={needChangeFutures.acceptorId}>Don't Change</option>
          {players
          .filter((player) => player.name !== "ADMIN")
          .map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        </label>
        {errors.acceptorId && <p>{errors.acceptorId}</p>}

        <label htmlFor="acceptorItems" className={classes.label} >What you expect to receive:</label>
        <input className={classes.input} type="text" name = "acceptorItems" onChange={handleChange} defaultValue = {needChangeFutures.acceptorItems}/>
        {errors.acceptorItems && <p>{errors.acceptorItems}</p>}

        <label htmlFor="acceptorCollateral" className={classes.label} >Your Trade Partner's Collaterals:</label>
        <input className={classes.input} type="text" name = "acceptorCollateral" onChange={handleChange} defaultValue = {needChangeFutures.acceptorCollateral} />
        {errors.acceptorCollateral && <p>{errors.acceptorCollateral}</p>}

        <label htmlFor="activeTurn" className={classes.label} >Which turn should this trade be active?:</label>
        <input className={classes.input} type="text" name = "activeTurn" onChange={handleChange} defaultValue = {needChangeFutures.activeTurn}/>
        {errors.activeTurn && <p>{errors.activeTurn}</p>}

        <label htmlFor="status" className={classes.label} >Status Code (Refer to Backend Manual):</label>
        <input className={classes.input} type="text" name = "status" onChange={handleChange} defaultValue = {needChangeFutures.status}/>
        {errors.status && <p>{errors.status}</p>}

        <label htmlFor="authorizationCode" className={classes.label} >Admin Code:</label>
        <input className={classes.input} type="password" name = "authorizationCode" onChange={handleChange}/>
        {errors.activeTurn && <p>{errors.activeTurn}</p>}

      <br />

      

      <button type="submit" className={classes.btn}>Update it!</button>
    </form>
    </>
  );
  
  };
export default UpdateFutures;
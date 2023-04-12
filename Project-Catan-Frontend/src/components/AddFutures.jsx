import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './AddFutures.module.css';
import Header from "./Header";
import api_url from "../config/config.js";

const totalTurns = 100;

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
  const [players, setPlayers] = useState([]);
  const [curturn, setCurturn] = useState([]);

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

    if (!formData.activeTurn) {
      formErrors.activeTurn = 'Do not leave it blank!';
    }

    if (Object.keys(formErrors).length === 0) {
        try {
            const code = JSON.parse(localStorage.getItem("token")).code
            const playerId = JSON.parse(localStorage.getItem("token")).id
            const response = await axios.post(`${api_url}/player/${playerId}/futures/${code}`, formData);
            if (response.status === 201) {
                navigate('/futures');
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

    const fetchCurturn = async () => {
      const response = await fetch(`${api_url}/player/turn`);
      const data = await response.json();
      setCurturn(data);
    };

    fetchAllPlayers();
    fetchCurturn();
  }, []);

  const currentUserId = JSON.parse(localStorage.getItem("token")).id;

  return (
    <>
    <Header title="Add..." />
    <form onSubmit={handleSubmit} className = {classes.form}>
    <button onClick={() => navigate('/futures')} className = {classes.backbtn}>Back to Futures...</button>
    <h1 className={classes.head}>Add Future Trade...</h1>
      {errors.unauthorized && <p className={classes.label}>{errors.unauthorized}</p>}
      {errors.unknown && <p className={classes.label}>{errors.unknown}</p>}

      <label className={classes.label}>
        Who do you wish to trade with?
        <select id = "acceptorId" name="acceptorId" onChange={handleChange} className={classes.dropdown}>
          <option value="">Please Select...</option>
          {players
          .filter((player) => player.name !== "ADMIN" && player.id !== currentUserId)
          .map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        </label>
        {errors.acceptorId && <p>{errors.acceptorId}</p>}

        <label htmlFor="initiatorItems" className={classes.label} >Your Items to Offer:</label>
        <input className={classes.input} type="text" name = "initiatorItems" onChange={handleChange} />
        {errors.initiatorItems && <p>{errors.initiatorItems}</p>}

        <label htmlFor="initiatorCollateral" className={classes.label} >Your Collaterals to Offer:</label>
        <input className={classes.input} type="text" name = "initiatorCollateral" onChange={handleChange} />
        {errors.initiatorCollateral && <p>{errors.initiatorCollateral}</p>}

        <label htmlFor="acceptorItems" className={classes.label} >What you expect to receive:</label>
        <input className={classes.input} type="text" name = "acceptorItems" onChange={handleChange} />
        {errors.acceptorItems && <p>{errors.acceptorItems}</p>}

        <label htmlFor="acceptorCollateral" className={classes.label} >Your Trade Partner's Collaterals:</label>
        <input className={classes.input} type="text" name = "acceptorCollateral" onChange={handleChange} />
        {errors.acceptorCollateral && <p>{errors.acceptorCollateral}</p>}

        <label className={classes.label}>
          When do you wish this Future to realize?
          <br />
        <select id = "activeTurn" name="activeTurn" onChange={handleChange} className={classes.dropdown}>
              <option value="">Please Select...</option>
              {Array.from({ length: 15 }, (_, index) => index + curturn).map(
                (turn) =>
                  turn <= totalTurns && (
                    <option key={turn} value={turn}>
                      {turn}
                    </option>
                  )
              )}
          </select>
        </label>
        {errors.activeTurn && <p>{errors.activeTurn}</p>}

      <br />

      

      <button type="submit" className={classes.btn}>Add it!</button>
    </form>
    </>
  );
  
  };
export default AddFutures;
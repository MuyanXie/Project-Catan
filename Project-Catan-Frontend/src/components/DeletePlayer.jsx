import React, { useState, useEffect } from "react";
import classes from "./DeletePlayer.module.css";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const DeletePlayer = () => {

  const [formData, setFormData] = useState({
    playerId: "",
    code: "",
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


  useEffect(() => {
    const fetchAllPlayers = async () => {
      const response = await fetch('http://localhost:8080/player/all');
      const data = await response.json();
      setPlayers(data);
    };

    fetchAllPlayers();
  }, []);

  const handleSubmit =async (event) => {
    event.preventDefault();
    let formErrors = {};
    if (!formData.playerId) {
      formErrors.playerId = 'Do not leave it blank!';
    }

    if (!formData.code) {
      formErrors.code = 'Do not leave it blank!';
    }

    if (Object.keys(formErrors).length === 0) {
      try {
          const playerId = formData.playerId;
          const code = formData.code;
          const response = await axios.delete(`http://localhost:8080/player/${playerId}/${code}`);
          if (response.status === 202) {
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
return (
  <>
  <Header title="Delete Player!!!" />
  <form onSubmit={handleSubmit} className = {classes.form}>

  <h1 className={classes.header}>Delete Player...</h1>

  <label className={classes.label}>
      Who do you wish to delete...?
      <br />
      <select id = "playerId" name="playerId" onChange={handleChange} className={classes.dropdown}>
        <option value="">Please Select...</option>
        {players
        .filter((player) => player.name !== "ADMIN")
        .map((player) => (
          <option key={player.id} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
  </label>
  {errors.playerId && <p>{errors.playerId}</p>}

  <label htmlFor="code" className={classes.label} >Your ADMIN Code:</label>
  <input className={classes.input} type="password" name = "code" onChange={handleChange} />
  {errors.code && <p>{errors.code}</p>}
  <br />
  <button type="submit" className={classes.btn}>Add it!</button>
  </form>

  </>

);
      };
export default DeletePlayer;
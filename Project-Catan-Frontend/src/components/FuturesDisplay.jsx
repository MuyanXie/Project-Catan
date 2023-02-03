import React, { useState, useEffect } from "react";
import classes from "./AbundancesDisplay.module.css";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AbundancesDisplay = () => {
  const navigate = useNavigate();
  const [allAbundances, setAllAbundances] = useState([]);
  const [playerAbundances, setPlayerAbundances] = useState([]);

  const handleDelete = (id) => {
    const playerId = JSON.parse(localStorage.getItem("token")).id;
    
    const fetchPlayerAbundances = async () => {
      const id = JSON.parse(localStorage.getItem("token")).id;
      const response = await fetch(`http://localhost:8080/player/${id}/abundances`);
      const data = await response.json();
      setPlayerAbundances(data);
    };

    const fetchAllAbundancesData = async () => {
      const response = await fetch('http://localhost:8080/abundances/all');
      const data = await response.json();
      setAllAbundances(data);
    };

    axios
      .delete(`http://localhost:8080/player/${playerId}/abundances/${id}`)
      .then((response) => {
        fetchPlayerAbundances();
        fetchAllAbundancesData();
      })
      .catch((error) => {
        localStorage.clear();
        alert("Login Credential Failed... Redirecting you to signin page");
        navigate("/signin");
      });
  };

  useEffect(() => {
    const fetchAllAbundancesData = async () => {
        const response = await fetch('http://localhost:8080/abundances/all');
        const data = await response.json();
        setAllAbundances(data);
      };


    const fetchPlayerAbundances = async () => {
        const id = JSON.parse(localStorage.getItem("token")).id;
        const response = await fetch(`http://localhost:8080/player/${id}/abundances`);
        const data = await response.json();
        setPlayerAbundances(data);
      };

      fetchAllAbundancesData();
      fetchPlayerAbundances();
  }, [])

  return (
    <>
    <Header title="Abundances" />

    <div>
        <h2 className={classes.header}>All Abundances</h2>
      <table className = {classes.table}>
        <thead>
          <tr>
            <th >ID</th>
            <th >Abundant in...</th>
            <th >from...</th>
          </tr>
        </thead>
        <tbody>
          {allAbundances.map((Abundance) => (
            <tr key={Abundance.id}>
              <td>{Abundance.id}</td>
              <td>{Abundance.stuff}</td>
              <td>{Abundance.player.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
        <h2 className={classes.header}>Your Abundances</h2>
      <table className = {classes.table}>
        <thead>
          <tr>
          <th >ID</th>
            <th >Abundant in...</th>
            <th >from...</th>
            <th>Operations...</th>
          </tr>
        </thead>
        <tbody>
          {playerAbundances.map((playera) => (
            <tr key={playera.id}>
              <td>{playera.id}</td>
              <td>{playera.stuff}</td>
              <td>{playera.player.name}</td>
              <td><button onClick={() => handleDelete(playera.id)} className={classes.button}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <button onClick={() => navigate('/abundanceform')} className={classes.bigbutton} >Add Your Abundance!</button>

    </>
  );
};

export default AbundancesDisplay;
import React, { useState, useEffect } from "react";
import classes from "./AbundancesDisplay.module.css";
import Header from "./Header";

const PlayerDisplay = () => {
  const [allAbundances, setAllAbundances] = useState([]);
  const [playerAbundances, setPlayerAbundances] = useState([]);
    const id = localStorage.getItem("token").id;

  useEffect(() => {
    const fetchAllAbundancesData = async () => {
        const response = await fetch('http://localhost:8080/abundances/all');
        const data = await response.json();
        setAllAbundances(data);
      };


    const fetchPlayerAbundances = async () => {
        const response = await fetch(`http://localhost:8080/player/${id}/abundances`);
        const data = await response.json();
        setPlayerAbundances(data);
      };

      fetchAllAbundancesData();
      fetchPlayerAbundances();
  }, [id])

  return (
    <>
    <Header title="Players" />

    <div>
        <h2>All Abundances</h2>
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
        <h2>Your Abundances</h2>
      <table className = {classes.table}>
        <thead>
          <tr>
          <th >ID</th>
            <th >Abundant in...</th>
            <th >from...</th>
          </tr>
        </thead>
        <tbody>
          {playerAbundances.map((playera) => (
            <tr key={playera.id}>
              <td>{playera.id}</td>
              <td>{playera.name}</td>
              <td>{playera.player.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


    </>
  );
};

export default PlayerDisplay;
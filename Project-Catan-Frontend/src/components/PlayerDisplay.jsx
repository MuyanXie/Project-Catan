import React, { useState, useEffect } from "react";
import classes from "./PlayerDisplay.module.css";
import Header from "./Header";
import api_url from "../config/config.js";

const PlayerDisplay = () => {
  const [players, setPlayers] = useState([]);


  useEffect(() => {
    fetch(`${api_url}/player/all`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
      });
  }, []);

  return (
    <>
    <Header title="Players" />
    <div>
      <table className = {classes.table}>
        <thead>
          <tr>
            <th >ID</th>
            <th >Name</th>
          </tr>
        </thead>
        <tbody>
          {players
          .filter((player) => player.name !== "ADMIN").map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default PlayerDisplay;

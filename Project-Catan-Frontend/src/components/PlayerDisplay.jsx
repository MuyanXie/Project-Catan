import React, { useState, useEffect } from "react";
import {MdMessage} from 'react-icons/md';
import classes from "./PlayerDisplay.module.css";
import { useNavigate } from 'react-router-dom';

const PlayerDisplay = () => {
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8080/player/all')
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
      });
  }, []);

  return (
    <>
    <header className={classes.header}>
    <h1 className={classes.logo}>
      <MdMessage />
      Player Information
    </h1>
    <p>
      <button className={classes.button} onClick={() => navigate('/')}>
          Back to Home
      </button>
    </p>
    </header>

    <div>
      <table className = {classes.table}>
        <thead>
          <tr>
            <th >ID</th>
            <th >Name</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
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

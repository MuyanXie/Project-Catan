import React, { useState, useEffect } from "react";
import classes from "./PlayerDisplay.module.css";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

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

/**
 * Admin control class is used to provide supreme control over the game;
 * Implemented Methods:
 * 1. Realized: Test Connections
 * 2. Delete Player
 * 3. Update/Delete Futures Contract Information
 * 4. Update/Delete Options Contract Information
 * 5. Delete Abundance
 * 6. Realized: Change Turn/ Progress the game to the next turn
 * 7. Change Status of Futures/Options Contract
 * 8. Realized: Display the current Turn in prominent position
 * 9. Realized: Provide current Version Information
 */


import React, { useState, useEffect } from 'react';
import packageJson from '/Users/apple/Desktop/Project Catan/Project-Catan-Frontend/package.json';
import Header from "./Header";
import classes from "./AdminControl.module.css";
import { useNavigate } from "react-router-dom";

const AdminControl = () => {
  const navigate = useNavigate();
    const [curturn, setCurturn] = useState([]);
    const [backendversion, setBackendversion] = useState([]);
    const [connectionissue, setConnectionissue] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchVersion = async () => {
          const response = await fetch('http://localhost:8080/player/version');
          const data = await response.json();
          if(data.hasOwnProperty('version')){
            setBackendversion(data);
            setConnectionissue(null)
          }
          else{
            setBackendversion(null)
            setConnectionissue(data.error)
          }
        };

        const fetchCurturn = async () => {
            const response = await fetch('http://localhost:8080/player/turn');
            const data = await response.json();
            setCurturn(data);
          };

          const fetchAllPlayers = async () => {
            const response = await fetch('http://localhost:8080/player/all');
            const data = await response.json();
            setPlayers(data);
          };

        fetchVersion();
        fetchCurturn();
        fetchAllPlayers();
      }, []);

  return (
    <>
    <Header title="Admin Panel" />

    <div className={classes.turn}>
        <h2 className={classes.head}>Current Turn</h2>
        <p className={classes.largewords}>{curturn}</p>
        <button onClick={() => navigate(`/changeturn?curturn=${curturn}`)} className={classes.bigbutton} >Change Turn!</button>
        <br></br>
    </div>
    <br></br>
    <br></br>
    <div className={classes.line}>
    <div className={classes.info}>
    <h2 className={classes.head}>Version Information</h2>
      <p className={classes.words}>Frontend Version: {packageJson.version}</p>
      {connectionissue ? (
        <p>Backend Version: BAD CONNECTION!</p>
      ):(
        <p className={classes.words}>Backend Version: {backendversion.version}</p>
      )
      }
      <br></br>
    </div>

    <div className={classes.info}>
    <h2 className={classes.head}>Connection Status</h2>
    {connectionissue ? (
        <p className={classes.bigwords}>System Offline...</p>
      ):(
        <p className={classes.bigwords}>System Online!</p>
      )}
    </div>
    </div>
    </>
  );
}

export default AdminControl;

/** Need to realize 6 sections
 * 1. Trades for you to authorize [Display, Authorize button]
 * 2. Trades you proposed but not authroized [Display, Delete button]
 * 2. Your this turn active Trade [Display]
 * 3. All your trades [Display]
 * 4. All this turn active Trade [Display]
 * 5. All player's futures trade [Display]
 * 6. Realized: Create New Futures Posts
 * thoughts: just don't allow futures trade; make them do new trades then
 * /{playerid}/futures/{futureId}/updateSTATUS/{authorizationCode}
 */

import React, { useState, useEffect } from "react";
import classes from "./FuturesDisplay.module.css";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FuturesDisplay = () => {
  const navigate = useNavigate();
  const [allNeedAuthorizeFutures, setAllNeedAuthorizeFutures] = useState([]);
  const [playerAbundances, setPlayerAbundances] = useState([]);

  const handleDelete = (id) => {
    const playerId = JSON.parse(localStorage.getItem("token")).id;

    const fetchPlayerAbundances = async () => {
      const id = JSON.parse(localStorage.getItem("token")).id;
      const response = await fetch(`http://localhost:8080/player/${id}/abundances`);
      const data = await response.json();
      setPlayerAbundances(data);
    };


    axios
      .delete(`http://localhost:8080/player/${playerId}/abundances/${id}`)
      .then((response) => {
        fetchPlayerAbundances();
      })
      .catch((error) => {
        localStorage.clear();
        alert("Login Credential Failed... Redirecting you to signin page");
        navigate("/signin");
      });
  };

  const handleAuthorize = (id) => {
    const playerId = JSON.parse(localStorage.getItem("token")).id;
    const code = JSON.parse(localStorage.getItem("token")).code;

    axios
    .put(`http://localhost:8080/player/${playerId}/futures/${id}/updateSTATUS/${code}`)
    .then((response) => {
      // fetchPlayerAbundances();
      // fetchAllAbundancesData();
    })
    .catch((error) => {
      localStorage.clear();
      alert("Login Credential Failed... Redirecting you to signin page");
      navigate("/signin");
    });
  };

  useEffect(() => {
    const fetchAllNeedAuthorizeFutures = async () => {
        const id = JSON.parse(localStorage.getItem("token")).id;
        const response = await fetch(`http://localhost:8080/player/${id}/futures/pending`);
        const data = await response.json();
        setAllNeedAuthorizeFutures(data);
      };

      fetchAllNeedAuthorizeFutures();
  }, [])

  return (
    <>
    <Header title="Futures" />

    <div>
        <h2 className={classes.header}>Futures Trades to be Authorized...</h2>
      <table className = {classes.table}>
        <thead>
          <tr>
            <th >Trade ID</th>
            <th >Acceptor Collateral</th>
            <th >Acceptor ID</th>
            <th >Acceptor Items</th>
            <th >Initiator Collateral</th>
            <th >Initiator ID</th>
            <th >Initiator Items</th>
            <th >Active Turn</th>
          </tr>
        </thead>
        <tbody>
          {allNeedAuthorizeFutures.map((futures) => (
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

    <button onClick={() => navigate('/futureform')} className={classes.bigbutton} >Create New Futures Trade!</button>

    </>
  );
};

export default FuturesDisplay;
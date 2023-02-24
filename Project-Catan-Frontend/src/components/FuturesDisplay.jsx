/** 
 * MISSION COMPLETE!!!
 * Need to realize 6 sections
 * 1. Realized: Trades for you to authorize [Display, Authorize button]
 * 2. Realized: Trades you proposed but not authroized [Display, Delete button]
 * 2. Realized: Your this turn active Trade [Display]
 * 3. Realized: All your trades [Display]
 * 5. Realized: All player's futures trade [Display]
 * 6. Realized: Create New Futures Posts
 * thoughts: just don't allow futures trade; make them do new trades then
 */

import React, { useState, useEffect } from "react";
import classes from "./FuturesDisplay.module.css";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FuturesDisplay = () => {
  const navigate = useNavigate();
  const [allNeedAuthorizeFutures, setAllNeedAuthorizeFutures] = useState([]);
  const [allProposingFutures, setAllProposingFutures] = useState([]);
  const [allActiveFutures, setAllActiveFutures] = useState([]);
  const [playerFutures, setPlayerFutures] = useState([]);
  const [allPlayerFutures, setAllPlayerFutures] = useState([]);


  const fetchAllNeedAuthorizeFutures = async () => {
    const id = JSON.parse(localStorage.getItem("token")).id;
    const response = await fetch(`http://localhost:8080/player/${id}/futures/pending`);
    const data = await response.json();
    setAllNeedAuthorizeFutures(data);
  };

  const fetchAllProposingFutures = async () => {
    const id = JSON.parse(localStorage.getItem("token")).id;
    const response = await fetch(`http://localhost:8080/player/${id}/futures/proposed`);
    const data = await response.json();
    setAllProposingFutures(data);
  };

  const fetchAllActiveFutures = async () => {
    const id = JSON.parse(localStorage.getItem("token")).id;
    const response = await fetch(`http://localhost:8080/player/${id}/futures/active`);
    const data = await response.json();
    setAllActiveFutures(data);
  };

  const fetchPlayerFutures = async () => {
    const id = JSON.parse(localStorage.getItem("token")).id;
    const response = await fetch(`http://localhost:8080/player/${id}/futures/all`);
    const data = await response.json();
    setPlayerFutures(data);
  };

  const fetchAllPlayerFutures = async () => {
    const response = await fetch(`http://localhost:8080/futures/all`);
    const data = await response.json();
    setAllPlayerFutures(data);
  };


  const handleAuthorize = (row) => {
    const playerId = JSON.parse(localStorage.getItem("token")).id;
    const code = JSON.parse(localStorage.getItem("token")).code;
    const updatedRow = { ...row, status: "0" };
    axios
    .put(`http://localhost:8080/player/${playerId}/futures/${row.id}/updateSTATUS/${code}`, updatedRow)
    .then((response) => {
      fetchAllNeedAuthorizeFutures();
      fetchAllProposingFutures();
      fetchAllActiveFutures();
      fetchPlayerFutures();
      fetchAllPlayerFutures();
    })
    .catch((error) => {
      localStorage.clear();
      alert("Login Credential Failed... Redirecting you to signin page");
      navigate("/signin");
    });
  };

  const handleNotAuthorize = (row) => {
    const playerId = JSON.parse(localStorage.getItem("token")).id;
    axios
    .delete(`http://localhost:8080/player/${playerId}/futures/${row.id}`)
    .then((response) => {
      fetchAllNeedAuthorizeFutures();
      fetchAllProposingFutures();
      fetchAllActiveFutures();
      fetchPlayerFutures();
      fetchAllPlayerFutures();
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

    const fetchAllProposingFutures = async () => {
        const id = JSON.parse(localStorage.getItem("token")).id;
        const response = await fetch(`http://localhost:8080/player/${id}/futures/proposed`);
        const data = await response.json();
        setAllProposingFutures(data);
      };

    const fetchAllActiveFutures = async () => {
        const id = JSON.parse(localStorage.getItem("token")).id;
        const response = await fetch(`http://localhost:8080/player/${id}/futures/active`);
        const data = await response.json();
        setAllActiveFutures(data);
      };
    
    const fetchPlayerFutures = async () => {
        const id = JSON.parse(localStorage.getItem("token")).id;
        const response = await fetch(`http://localhost:8080/player/${id}/futures/all`);
        const data = await response.json();
        setPlayerFutures(data);
      };

    const fetchAllPlayerFutures = async () => {
        const response = await fetch(`http://localhost:8080/futures/all`);
        const data = await response.json();
        setAllPlayerFutures(data);
      };

    fetchAllNeedAuthorizeFutures();
    fetchAllProposingFutures();
    fetchAllActiveFutures();
    fetchPlayerFutures();
    fetchAllPlayerFutures();
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
            <th>Operations...</th>
          </tr>
        </thead>
        <tbody>
          {allNeedAuthorizeFutures.map((futures) => (
            <tr key={futures.id}>
              <td>{futures.id}</td>
              <td>{futures.acceptorCollateral}</td>
              <td>{futures.acceptorId}</td>
              <td>{futures.acceptorItems}</td>
              <td>{futures.initiatorCollateral}</td>
              <td>{futures.initiatorId}</td>
              <td>{futures.initiatorItems}</td>
              <td>{futures.activeTurn}</td>
              <td>
                <button onClick={() => handleAuthorize(futures)} className={classes.button}>Accept!</button>
                <button onClick={() => handleNotAuthorize(futures)} className={classes.button}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
        <h2 className={classes.header}>Your Proposing Trades...</h2>
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
            <th>Operations...</th>
          </tr>
        </thead>
        <tbody>
        {allProposingFutures.map((futures) => (
            <tr key={futures.id}>
              <td>{futures.id}</td>
              <td>{futures.acceptorCollateral}</td>
              <td>{futures.acceptorId}</td>
              <td>{futures.acceptorItems}</td>
              <td>{futures.initiatorCollateral}</td>
              <td>{futures.initiatorId}</td>
              <td>{futures.initiatorItems}</td>
              <td>{futures.activeTurn}</td>
              <td>
                <button onClick={() => handleNotAuthorize(futures)} className={classes.button}>Revoke</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
        <h2 className={classes.header}>Your Current Active Trades...</h2>
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
        {allActiveFutures.map((futures) => (
            <tr key={futures.id}>
              <td>{futures.id}</td>
              <td>{futures.acceptorCollateral}</td>
              <td>{futures.acceptorId}</td>
              <td>{futures.acceptorItems}</td>
              <td>{futures.initiatorCollateral}</td>
              <td>{futures.initiatorId}</td>
              <td>{futures.initiatorItems}</td>
              <td>{futures.activeTurn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
        <h2 className={classes.header}>All Your Trades...</h2>
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
        {playerFutures.map((futures) => (
            <tr key={futures.id}>
              <td>{futures.id}</td>
              <td>{futures.acceptorCollateral}</td>
              <td>{futures.acceptorId}</td>
              <td>{futures.acceptorItems}</td>
              <td>{futures.initiatorCollateral}</td>
              <td>{futures.initiatorId}</td>
              <td>{futures.initiatorItems}</td>
              <td>{futures.activeTurn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
        <h2 className={classes.header}>All Players' Trades...</h2>
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
        {allPlayerFutures.map((futures) => (
            <tr key={futures.id}>
              <td>{futures.id}</td>
              <td>{futures.acceptorCollateral}</td>
              <td>{futures.acceptorId}</td>
              <td>{futures.acceptorItems}</td>
              <td>{futures.initiatorCollateral}</td>
              <td>{futures.initiatorId}</td>
              <td>{futures.initiatorItems}</td>
              <td>{futures.activeTurn}</td>
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
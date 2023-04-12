/**
 * Admin control class is used to provide supreme control over the game;
 * Implemented Methods:
 * 1. Realized: Test Connections
 * 2. Realized: Delete Player
 * 3. Realized: Update/Delete Futures Contract Information (including changing the status)
 * 4. Realized: Delete Abundance
 * 5. Realized: Change Turn/ Progress the game to the next turn
 * 6. Realized: Display the current Turn in prominent position
 * 7. Realized: Provide current Version Information
 */

import React, { useState, useEffect } from 'react';
import packageJson from '../../package.json';
import Header from "./Header";
import classes from "./AdminControl.module.css";
import { useNavigate } from "react-router-dom";
import api_url from "../config/config.js";

const AdminControl = () => {
  const navigate = useNavigate();
    const [curturn, setCurturn] = useState([]);
    const [backendversion, setBackendversion] = useState([]);
    const [connectionissue, setConnectionissue] = useState([]);
    const [allPlayerFutures, setAllPlayerFutures] = useState([]);

    const handleUpdate = (needUpdateFutures) => {
      navigate("/updatefutures", {state : {needUpdateFutures}});
    }

    const handleDelete = (needDeleteFutures) => {
      navigate(`/deletefuture?futureid=${needDeleteFutures.id}`);
    }

    useEffect(() => {
        const fetchVersion = async () => {
          const response = await fetch(`${api_url}/player/version`);
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

        const fetchAllPlayerFutures = async () => {
          const response = await fetch(`${api_url}/futures/all`);
          const data = await response.json();
          setAllPlayerFutures(data);
        };

        const fetchCurturn = async () => {
            const response = await fetch(`${api_url}/player/turn`);
            const data = await response.json();
            setCurturn(data);
          };

        fetchVersion();
        fetchCurturn();
        fetchAllPlayerFutures();

      }, []);

  return (
    <>
    <Header title="Admin Panel" />

    <div className={classes.line}>
    <div className={classes.turn}>
        <h2 className={classes.head}>Current Turn</h2>
        <p className={classes.largewords}>{curturn}</p>
        <button onClick={() => navigate(`/changeturn?curturn=${curturn}`)} className={classes.bigbutton} >Change Turn!</button>
        <br></br>
    </div>

    <div className={classes.operations}>
        <h2 className={classes.head}>Operations</h2>
        <button onClick={() => navigate(`/deleteplayer`)} className={classes.bigbutton} >Delete Player!?</button>
        <br></br>
        <button onClick={() => navigate(`/deleteabundance`)} className={classes.bigbutton} >Delete Abundances!?</button>
    </div>


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

    <div>
        <h2 className={classes.header}>All Future Trades</h2>
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
              <td>
                <button onClick={() => handleUpdate(futures)} className={classes.button}>Update</button>
                <button onClick={() => handleDelete(futures)} className={classes.button}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>



    </>
  );
}

export default AdminControl;

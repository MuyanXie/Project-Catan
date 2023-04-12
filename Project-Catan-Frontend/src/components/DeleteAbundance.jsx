import React, { useState, useEffect } from "react";
import classes from "./DeleteAbundance.module.css";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api_url from "../config/config.js";

const DeleteAbundance = () => {
  const navigate = useNavigate();
  const [allAbundances, setAllAbundances] = useState([]);


  const handleDelete = (id) => {
    const playerId = JSON.parse(localStorage.getItem("token")).id;


    const fetchAllAbundancesData = async () => {
      const response = await fetch(`${api_url}/abundances/all`);
      const data = await response.json();
      setAllAbundances(data);
    };

    axios
      .delete(`${api_url}/${playerId}/abundances/${id}`)
      .then((response) => {
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
        const response = await fetch(`${api_url}/abundances/all`);
        const data = await response.json();
        setAllAbundances(data);
      };

      fetchAllAbundancesData();

  }, [])

  return (
    <>
    <Header title="Delete Abundances..." />

    <div>
        <h2 className={classes.header}>All Abundances</h2>
      <table className = {classes.table}>
        <thead>
          <tr>
            <th >ID</th>
            <th >Abundant in...</th>
            <th >from...</th>
            <th >Operations...</th>
          </tr>
        </thead>
        <tbody>
          {allAbundances.map((Abundance) => (
            <tr key={Abundance.id}>
              <td>{Abundance.id}</td>
              <td>{Abundance.stuff}</td>
              <td>{Abundance.player.name}</td>
              <td><button onClick={() => handleDelete(Abundance.id)} className={classes.button}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
};

export default DeleteAbundance;
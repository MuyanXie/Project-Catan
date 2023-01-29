import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";
import { createBrowserHistory as createHistory } from 'history';

const PlayerDisplay = () => {
  const [players, setPlayers] = useState([]);
  const history = createHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8080/player/all")
      .then(res => setPlayers(res.data))
      .catch(error => console.log(error));
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    }
  ];

  return (
    <div>
      <h1>Player Information</h1>
      <Link to="/">
        <button>Back to Homepage</button>
      </Link>
      <Table dataSource={players} columns={columns} />
    </div>
  );
};

export default PlayerDisplay;

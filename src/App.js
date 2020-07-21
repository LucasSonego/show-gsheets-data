import React, { useEffect, useState } from "react";
import api from "axios";
import dataParser from "data-to-json";

import { Container } from "./styles";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function awaitData() {
      const response = await api.get(
        "https://docs.google.com/spreadsheets/u/0/d/1IjKsQSZkScWcBXgwwofvyZL9ANykYiUaXKANE-peVg0/export?gid=0&format=csv"
      );

      const jsonData = dataParser.csv({ data: response.data }).toJson();
      jsonData.shift();
      setData(jsonData);
    }

    awaitData();
  }, []);

  return (
    <Container>
      <ul>
        {data.map((user) => (
          <li key={user.id} className="card">
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default App;

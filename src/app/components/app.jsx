import React, { useEffect, useState } from "react";
import ClassSession from "./class-session";
import Axios from "axios";

const clientId = 'OZ8OSfW34FMJJHIWXmbZMcWNpLKu4EhY7r5lvJPM';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const token = await window.xprops.auth.getToken(clientId);
      const axios = Axios.create({
        baseURL: "http://localhost:5000/api",
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await axios("/users/self");
      const employee = await axios(`/employees?user=${user.data.data.id}`);
      const classSessions = await axios(
        `/class_sessions?employee_public_profiles=${employee.data.data[0].id}`
      );

      setData(classSessions.data.data);
    }

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const classSessionListItems = data.map(({ attributes: session, id }) => (
    <ClassSession key={id} session={{ id, ...session }} />
  ));

  return <ul>{classSessionListItems}</ul>;
}

export default App;

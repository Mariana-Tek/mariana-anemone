import React, { useEffect, useState } from "react";
import ClassSession from "./class-session";
import Axios from "axios";

const { access_token } = JSON.parse(
  localStorage.getItem("mariana-auth-session")
);
const axios = Axios.create({
  baseURL: "https://cousteau-r45kxk.marianatek.com/api",
  headers: { Authorization: `Bearer ${access_token}` },
});

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
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

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

const { access_token } = JSON.parse(
  localStorage.getItem("mariana-auth-session")
);
const axios = Axios.create({
  baseURL: "https://cousteau-r45kxk.marianatek.com/api",
  headers: { Authorization: `Bearer p1MkJJVj6ge5THdI1HqeTCHgrrzIWN` },
});

function ClassSession({ session }) {
  return <li>
      {session.class_type_display}

      <button onClick={() => window.xprops.actions.goToClass(session.id)}>
          View
      </button>
    </li>;
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
    <ClassSession key={id} session={{id, ...session}} />
  ));

  return <ul>{classSessionListItems}</ul>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

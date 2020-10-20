import React, { Fragment, useEffect, useState } from "react";
import ClassSession from "./class-session";
import Axios from "axios";
import { mariana } from "../../utils";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const token = await mariana.auth.getToken();
            const axios = Axios.create({
                baseURL: mariana.api.getApiBaseUrl(),
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = await axios("/api/users/self");
            const employee = await axios(`/api/employees?user=${user.data.data.id}`);
            const employeeProfileId = employee.data.data[0].relationships.public_profile.data.id;
            const classSessions = await axios(`/api/class_sessions?employee_public_profiles=${employeeProfileId}`);

            setData(classSessions.data.data);
        }

        fetchData();
    }, []);

    if (!data) return <p>Loading...</p>;

    const classSessionListItems = data.map(({ attributes: session, id }) => (
        <ClassSession key={id} session={{ id, ...session }} />
    ));

    return (
        <Fragment>
            <h1 className="type-title-1">Your Class Schedule</h1>
            <ul>{classSessionListItems}</ul>
        </Fragment>
    );
}

export default App;

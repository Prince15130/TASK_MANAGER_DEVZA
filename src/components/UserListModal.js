import React, { useState, useEffect } from "react";
import Users from "./Users";

export const UserListModal = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  const getUsers = async () => {
    setLoading(true);
    const res = await fetch("https://devza.com/tests/tasks/listusers", {
      headers: {
        AuthToken: "ofy2MvDeWVWur9UNRZdjb982kIhY3az6",
      },
    });
    const data = await res.json();
    setUsers(data.users);
    setLoading(false);
  };
  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Users List</h4>
        <ul className="collection">
          {!loading && users.length === 0 ? (
            <p className="center">No Users</p>
          ) : (
            users.map((user) => <Users user={user} key={user.id} />)
          )}
        </ul>
      </div>
    </div>
  );
};

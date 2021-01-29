import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTask, getTasks } from "../actions/taskActions";
import M from "materialize-css/dist/js/materialize.min.js";

const AddTaskModal = ({ addTask, getTasks }) => {
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("");
  const [person, setPerson] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  const getUsers = async () => {
    const res = await fetch("https://devza.com/tests/tasks/listusers", {
      headers: {
        AuthToken: "ofy2MvDeWVWur9UNRZdjb982kIhY3az6",
      },
    });
    const data = await res.json();
    setUsers(data.users);
  };

  const onSubmit = () => {
    if (message === "" || person === "") {
      M.toast({ html: "Please enter a Message and Technician" });
    } else {
      const newTask = {
        message,
        priority,
        person,
      };

      addTask(newTask);
      M.toast({ html: `New Task Added` });
      setMessage("");
      setPriority("");
      setPerson("");
      getTasks();
    }
  };
  return (
    <div id="add-task-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Tasks</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <label htmlFor="message" className="active">
              Task Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="person"
              value={person}
              className="browser-default"
              onChange={(e) => setPerson(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="priority"
              value={priority}
              className="browser-default"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="3">High</option>
              <option value="2">Medium</option>
              <option value="1">Normal</option>
            </select>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          className="modal-close waves-light blue btn-flat"
          onClick={onSubmit}
        >
          Enter<i className="material-icons right">send</i>
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  height: "75%",
  width: "75%",
};

export default connect(null, { addTask, getTasks })(AddTaskModal);

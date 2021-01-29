import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { updateLog, getTasks } from "../actions/taskActions";

const EditTaskModal = ({ current, updateLog, getTasks }) => {
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("");
  const [person, setPerson] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await fetch("https://devza.com/tests/tasks/listusers", {
      headers: {
        AuthToken: "ofy2MvDeWVWur9UNRZdjb982kIhY3az6",
      },
    });
    const data = await res.json();
    setUsers(data.users);
  };

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setPriority(current.priority);
      setPerson(current.assigned_to);
    }
    getUsers();
  }, [current]);

  const onSubmit = () => {
    if (message === "" || person === "") {
      M.toast({ html: "Please enter a Message and Technician" });
    } else {
      const updTask = {
        id: current.id,
        message,
        priority,
        assigned_to: person,
      };
      updateLog(updTask);
      M.toast({ html: "Task Updated" });
      setMessage("");
      setPriority("");
      setPerson("");
      getTasks();
    }
  };
  return (
    <div id="edit-task-modal" className="modal" style={modalStyle}>
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
const mapStateToProps = (state) => ({
  current: state.task.current,
});
export default connect(mapStateToProps, { updateLog, getTasks })(EditTaskModal);

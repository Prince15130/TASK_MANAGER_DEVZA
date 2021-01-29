import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteTask, setCurrent } from "../actions/taskActions";
import M from "materialize-css/dist/js/materialize.min.js";

const TaskItem = ({ task, deleteTask, setCurrent }) => {
  const onDelete = () => {
    deleteTask(task.id);
    M.toast({ html: "Task Deleted" });
  };
  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-task-modal"
          className={`modal-trigger ${
            task.priority === "3"
              ? "red-text"
              : task.priority === "2"
              ? "blue-text"
              : "green-text"
          }`}
          onClick={() => setCurrent(task)}
        >
          {task.message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID #{task.id}</span> last updated by{" "}
          <span className="black-text">{task.assigned_name}</span> on{" "}
          <Moment format="MMMM Do YYYY, h:mm:ss a">{task.created_on}</Moment>
        </span>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default connect(null, { deleteTask, setCurrent })(TaskItem);

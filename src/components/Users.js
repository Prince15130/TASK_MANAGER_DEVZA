import React from "react";
import PropTypes from "prop-types";

const TaskItem = ({ user }) => {
  return (
    <li className="collection-item avatar">
      <div>
        <img src={user.picture} alt="" className="circle" />
        <span className="black-text title">{user.name}</span>
        <br />
        <span className="blue-grey-text ">ID #{user.id}</span>
      </div>
    </li>
  );
};

TaskItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TaskItem;

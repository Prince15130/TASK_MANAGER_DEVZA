import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Loader } from "./Loader";
import TaskItem from "./TaskItem";
import { getTasks } from "../actions/taskActions";

const Tasks = ({ props, getTasks }) => {
  const tasks = props.tasks;
  const loading = props.loading;
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  if (loading || tasks === null) {
    return <Loader />;
  }
  console.log(tasks);

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">Tasks</h4>
      </li>
      {!loading && tasks.length === 0 ? (
        <p className="center">No Tasks</p>
      ) : (
        tasks.map((task) => <TaskItem task={task} key={task.id} />)
      )}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  props: state.task,
});

export default connect(mapStateToProps, { getTasks })(Tasks);

import {
  GET_TASKS,
  SET_LOADING,
  TASKS_ERROR,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  SEARCH_TASKS,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "./types";

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const getTasks = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("https://devza.com/tests/tasks/list", {
      headers: {
        AuthToken: "ofy2MvDeWVWur9UNRZdjb982kIhY3az6",
      },
    });
    const data = await res.json();
    dispatch({
      type: GET_TASKS,
      payload: data.tasks,
    });
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: err.response.statusText,
    });
  }
};

export const addTask = (task) => async (dispatch) => {
  try {
    setLoading();
    console.log(task);
    const formdata = new FormData();
    formdata.append("message", task.message);
    formdata.append("priority", task.priority);
    formdata.append("assigned_to", task.person);
    const res = await fetch("https://devza.com/tests/tasks/create", {
      method: "POST",
      body: formdata,
      headers: {
        AuthToken: "ofy2MvDeWVWur9UNRZdjb982kIhY3az6",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_TASK,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: err.response.statusText,
    });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    setLoading();
    const formdata = new FormData();
    formdata.append("taskid", id);
    await fetch("https://devza.com/tests/tasks/delete", {
      method: "POST",
      body: formdata,
      headers: {
        AuthToken: "ofy2MvDeWVWur9UNRZdjb982kIhY3az6",
      },
    });
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: err.response.statusText,
    });
  }
};

export const setCurrent = (task) => {
  return {
    type: SET_CURRENT,
    payload: task,
  };
};

export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

export const updateLog = (task) => async (dispatch) => {
  try {
    setLoading();

    const formdata = new FormData();
    formdata.append("message", task.message);
    formdata.append("priority", task.priority);
    formdata.append("assigned_to", task.assigned_to);
    formdata.append("taskid", task.id);
    const res = await fetch("https://devza.com/tests/tasks/update", {
      method: "POST",
      body: formdata,
      headers: {
        AuthToken: "ofy2MvDeWVWur9UNRZdjb982kIhY3az6",
      },
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_TASK,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: err.response.statusText,
    });
  }
};

export const searchTasks = (text) => async (dispatch) => {
  try {
    setLoading();

    dispatch({
      type: SEARCH_TASKS,
      payload: text,
    });
  } catch (err) {
    dispatch({
      type: TASKS_ERROR,
      payload: err.response.statusText,
    });
  }
};

import {
  GET_TASKS,
  SET_LOADING,
  TASKS_ERROR,
  ADD_TASK,
  DELETE_TASK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TASK,
  SEARCH_TASKS,
} from "../actions/types";

const initialState = {
  tasks: null,
  current: null,
  loading: false,
  error: null,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TASKS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case ADD_TASK:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case SEARCH_TASKS:
      console.log(state.tasks);
      let filteredValues = state.tasks.filter((product) => {
        //look for objects with the received value in their ‘name’ or ‘designer’ fields
        return (
          product.message
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          product.assigned_name
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        );
      });

      return {
        ...state,
        tasks: filteredValues,
      };
    default:
      return state;
  }
};

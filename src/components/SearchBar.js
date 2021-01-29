import React, { useRef } from "react";
import { connect } from "react-redux";
import { searchTasks, getTasks } from "../actions/taskActions";

const SearchBar = ({ searchTasks, getTasks }) => {
  const text = useRef("");

  const onChange = (e) => {
    if (e.target.value !== "") {
      searchTasks(e.target.value);
    } else {
      getTasks();
    }
  };
  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search Tasks..."
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default connect(null, { searchTasks, getTasks })(SearchBar);

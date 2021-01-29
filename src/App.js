import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Tasks from "./components/Tasks";
import { AddButton } from "./components/AddButton";
import AddTaskModal from "./components/AddTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import { UserListModal } from "./components/UserListModal";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <>
        <SearchBar />
        <div className="container">
          <AddButton />
          <AddTaskModal />
          <EditTaskModal />
          <UserListModal />
          <Tasks />
        </div>
      </>
    </Provider>
  );
}

export default App;

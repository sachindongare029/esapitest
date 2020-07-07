import React from "react";
import "./App.css";
import "./Components/DND/index.scss";
// import OnlineMulti from './Components/OnlineMulti';
// import Datasearch from './Components/Datasearch';
// import BookDatasearch from './Components/BookDatasearch';
// import Gallary from './Components/Gallary';
// import DragAndDrop from "./Components/DND/DragAndDrop";
import Autosuggest from './Components/Autosuggest';

function App() {
  return (
    <div className="App">
      {/* <Datasearch /> */}
      {/* <OnlineMulti /> */}
      {/* <Gallary /> */}
      {/* <DragAndDrop /> */}
      <Autosuggest />
    </div>
  );
}

export default App;

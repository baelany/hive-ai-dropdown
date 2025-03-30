import React from "react";
import "./App.css";
import Dropdown from "./Dropdown";

const volleyballPlayers = [
  "Jordan Thompson",
  "Annie Drews",
  "Haleigh Washington",
  "Chiaka Ogbogu",
  "Justine has a super long name let's see what this looks like in the dropdown Wong-Orantes",
  "Jordyn Poulter",
];
const App = () => {

  return (
    <div className="container">
        <div className="single-dropdown">
            <h1>Single Selection Dropdown</h1>
            <Dropdown options={volleyballPlayers} />
        </div>
        <div className="multiple-dropdown">
            <h1>Multiple Selection Dropdown</h1>
            <Dropdown options={volleyballPlayers} multipleSelect />
        </div>
    </div>
  );
};

export default App;
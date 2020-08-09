import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginButton from './loginbutton';
import SearchBar from "material-ui-search-bar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <LoginButton/>
      <SearchBar
    value={this.state.value}
    onChange={(newValue) => console.log("onChange")}
    onRequestSearch={() => console.log("onRequest")}
  />
    </div>
  );
}
export default App;

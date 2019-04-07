import React, { Component } from 'react';
import './App.css';
import Home from '.././Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <h1>
           VergeSense Dashboard
         </h1>
        </header>
        <Home />
      </div>
    );
  }
}

export default App;

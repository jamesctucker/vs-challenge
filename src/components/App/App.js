import React, { Component } from 'react';
import './App.css';
import FileReader from '.././FileReader/FileReader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            CSV Converter
         </h1>
        </header>
        <FileReader />
      </div>
    );
  }
}

export default App;

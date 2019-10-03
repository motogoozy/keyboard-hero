import React, { Component } from 'react';
import './App.css';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          { routes }
        </div>
        <footer>
          <small>&copy; 2019, Kyle Payne | All Rights Reserved</small>
        </footer>
      </div>
    );
  }
}

export default App;
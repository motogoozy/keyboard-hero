import React, { Component } from 'react';
import './App.css';
import TypingTest from '../src/components/TypingTest/TypingTest';

class App extends Component {
  state = {

  }


  render() {

    return (
      <div className="App">
          <div className='test-container'>
            <TypingTest />
          </div>
      </div>
    );
  }
}

export default App;
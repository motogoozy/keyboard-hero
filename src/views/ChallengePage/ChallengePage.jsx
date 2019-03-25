import React, { Component } from 'react';
import './ChallengePage.scss';
import TypingTest from '../../components/TypingTest/TypingTest';
import { Link } from 'react-router-dom';

class ChallengePage extends Component {
   render() {
      return (
         <div className='challenge-main'>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
               <h1 style={{ fontSize: '3em', fontFamily: 'Courier' }}>Keyboard Hero</h1>
            </Link>
            <div className='test-container'>
               <TypingTest />
            </div>
         </div>
      );
   }
}

export default ChallengePage;
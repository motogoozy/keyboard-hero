import React, { Component } from 'react';
import './ChallengePage.scss';
import TypingTest from '../../components/TypingTest/TypingTest';

class ChallengePage extends Component {
   render() {
      return (
         <div className='challenge-main'>
            <div className='test-container'>
               <TypingTest />
            </div>
         </div>
      );
   }
}

export default ChallengePage;
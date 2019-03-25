import React, { Component } from 'react';
import './Modal.scss';

export default class Modal extends Component {
   render() {
      const { wpm } = this.props;

      return (
         <div className='modal-wrapper'>
            <div className='modal'>
               <h1>Good Job!</h1>
               <h2>You typed {wpm} words per minute!</h2>
               <button onClick={() => this.props.reset()}>Try Again</button>
               <p>Enter your name to submit your score and see your rank!</p>
               <button>Go to Leaderboard</button>
            </div>
         </div>
      )
   }
}

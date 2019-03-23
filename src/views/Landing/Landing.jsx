import React, { Component } from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
   render() {
      return (
         <div className='landing-page'>
            <h1>Welcome to Keyboard Hero!</h1>
            <p>Keyboard Hero is a typing challenge that tests both your typing speed and accuracy.</p>
            <p>Ready to begin?</p>
            <div>
               <Link to='/challenge' className='go-button'>Let's Go!</Link>
            </div>
         </div>
      )
   }
}

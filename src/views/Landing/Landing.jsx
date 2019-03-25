import React, { Component } from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
   render() {
      return (
         <div className='landing-page'>
            <h2>Welcome to</h2>
            <h1>Keyboard Hero!</h1>
            <br/>
            <p>A typing challenge that tests both your typing <span className='emphasize' >speed</span> and <span className='emphasize' >accuracy</span>.</p>
            <p>Ready to begin?</p>
            <div className='go-button'>
               <Link to='/challenge' className='go-text' style={{ textDecoration: 'none', color: 'white', fontSize: '3rem' }}>Let's Go!</Link>
            </div>
         </div>
      )
   }
}

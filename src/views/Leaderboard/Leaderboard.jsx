import React, { Component } from 'react';
import './Leaderboard.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Leaderboard extends Component {
   state = {
      scores: []
   };
   
   componentDidMount = async () => {
      await this.getScores();
      console.log('scores retrieved')
   }

   getScores = async () => {
      let res = await axios.get('/api/score'); //gets top 20 scores
      await this.setState({scores: res.data})
   }

   render() {
      const { scores } = this.state;
      let displayScores = scores.map((score, index) => {
         let position = index + 1;
         return (
            <div className='score' key={index}>
               <span>{position}</span>
               <span>{score.name}</span>
               <span>{score.score}</span>
            </div>
         )
      })

      return (
         <div className='leaderboard-main' style={{ textDecoration: 'none', color: 'white' }} >
            <Link to='/challenge' style={{ textDecoration: 'none', color: 'white' }}>
               <i class="fas fa-undo back-arrow"></i>
            </Link>
            <h1 style={{ fontSize: '3em', fontFamily: 'Courier' }}>Leaderboard</h1>
            <div className="leaderboard">
               <div className='leaderboard-header'>
                  <span><h3>Rank</h3></span>
                  <span><h3>Name</h3></span>
                  <span><h3>Score</h3></span>
               </div>
               <div className='leaderboard-scores'>
                  {displayScores}
               </div>
            </div>
         </div>
      )
   }
}

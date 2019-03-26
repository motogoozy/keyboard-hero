import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import './Modal.scss';
import axios from 'axios';

class Modal extends Component {
   state = {
      name: ''
   };

   addScore = async () => {
      const { name } = this.state;
      const { wpm } = this.props;
      let res = await axios.post(`/api/score`, ({ name: name, score: wpm }));
      console.log(res.data.message)
   }

   handleSubmit = async () => {
      await this.addScore();
      this.props.history.push('/leaderboard')
   }

   render() {
      const { wpm } = this.props;

      return (
         <div className='modal-wrapper'>
            <div className='modal'>
               <h2>Good job!</h2>
               <h3>You typed <span style={{ color: 'green' }}>{wpm}</span> words per minute!</h3>
               <button className='modal-button' onClick={() => this.props.reset()}>Try Again</button>
               <p>Enter your name to submit your score and see your rank!</p>
               <br />
               <input onChange={(e) => this.setState({ name: e.target.value })} type="text" placeholder='Enter your name here' autoFocus />
               <button
                  className='modal-button'
                  style={{ height: '4rem' }}
                  onClick={() => this.handleSubmit()}
               >Go to Leaderboard</button>
            </div>
         </div>
      )
   }
}

export default withRouter(Modal)
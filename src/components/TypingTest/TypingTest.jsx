import React, { Component } from 'react';
import './TypingTest.scss';
import axios from 'axios';
import Modal from '../Modal/Modal';

export default class TypingTest extends Component {
   state = {
      originalText: '',
      originalTextArray: [],
      userInput: '',
      userInputArray: [],
      time: 0,
      start: 0,
      isOn: false,
      wpm: 0,
      showModal: false,
   }

   componentDidMount = async () => {
      await this.getParagraph();
   }

   getParagraph = async () => {
      const paragraph_id = await Math.floor((Math.random() * 14) + 1); //Picks a random paragraph from database (There are currently 14 paragraphs stored in database)
      const res = await axios.get(`/api/paragraph/${paragraph_id}`);
      await this.setState({
         originalText: res.data[0].paragraph_text,
      });
      await this.setState({ originalTextArray: this.state.originalText.split('') });
      await console.log(this.state.originalText.split(' ').length + ' words')

   }

   handleInput = async (inputString) => {
      const { userInput } = this.state;
      await this.setState({ userInput: inputString });
      await this.setState({ userInputArray: userInput.split('') })
      if (this.state.userInput.length === 1) {
         this.startTimer();
      } else if (this.state.userInput === this.state.originalText) {
         this.stopTimer();
      }
   }

   startTimer = async () => {
      await this.setState({
         time: this.state.time,
         start: Date.now() - this.state.time,
         isOn: true
      });
      this.timer = await setInterval(() => this.setState({
         time: Date.now() - this.state.start
      }), 1);
      await console.log('timer started')
   }

   stopTimer = async () => {
      const { time } = this.state;
      let wordCount = this.state.originalText.split(' ').length;
      let seconds = time / 1000;
      let minutes = seconds / 60;
      let wpm = Math.floor(wordCount / minutes);
      await this.setState({
         isOn: false,
         wpm: wpm,
         showModal: true,
      });
   }

   reset = () => {
      window.location.reload(); //refreshes page
   }


   render() {
      const { originalTextArray, userInput, time } = this.state;
      // Spell checking
      // eslint-disable-next-line
      let displayParagraph = originalTextArray.map((letter, index) => {
         if (!userInput[index]) { //if user hasn't entered the character yet, letter will be gray
            return (
               <span style={{ color: 'gray' }} key={index}>{letter}</span>
            )
         } else if (letter === userInput[index]) { //if what the user typed in matches the original text, letter will be green
            return (
               <span style={{ color: 'green' }} key={index}>{letter}</span>
            )
         } else if (letter !== userInput[index]) { //if what the user typed doesn't match the original text, letter will be red
            return (
               <span style={{ backgroundColor: 'red' }} key={index}>{letter}</span>
            )
         }
      })

      // Timer
      let seconds = (time / 1000).toFixed(2); //limits number to 2 decimal places


      return (
         <div className='typing-test'>
            <div className='text-window'>
               {displayParagraph}
            </div>
            <div>
               <h3>Time:</h3>
               <h3 style={{ width: '300px', letterSpacing: '1.5px', fontSize: '1.25rem' }} >{seconds}</h3>
            </div>
            <textarea
               className='input-box'
               type='text'
               placeholder='Start typing to begin test'
               onChange={(e) => this.handleInput(e.target.value)}
               autoFocus
               style={{ borderRadius: '10px', padding: '10px' }}
            >
            </textarea>
            {/* Render Modal once challenge is complete */}
            {
               this.state.showModal &&
               <Modal
                  wpm={this.state.wpm}
                  reset={this.reset}
               />
            }
         </div>
      )
   }
}
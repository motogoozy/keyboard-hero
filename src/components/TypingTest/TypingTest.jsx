import React, { Component } from 'react';
import './TypingTest.scss';
import axios from 'axios';

export default class TypingTest extends Component {
   state = {
      originalText: '',
      originalTextArray: [],
      userInput: '',
      userInputArray: [],
      time: 0,
      start: 0,
      isOn: false,
   }

   componentDidMount = async () => {
      await this.getParagraph();
      const { originalText } = this.state;
   }

   getParagraph = async () => {
      const paragraph_id = await Math.floor((Math.random() * 14) + 1); //Picks a random paragraph from database
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
      let wpm = wordCount / minutes;
      await this.setState({ isOn: false });
      console.log(wpm + ' words per minute')
      await clearInterval(this.timer);
   }

   resetTimer = () => {
      this.setState({ time: 0 })
   }


   render() {
      const { originalTextArray, userInput, time } = this.state;
      // Spell checking
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
      let seconds = time / 1000;


      return (
         <div className='typing-test'>
            <div className='text-window'>
               {displayParagraph}
            </div>
            <div>
               <h3 style={{ width: '30px' }} >Time: {seconds}</h3>
            </div>
            <textarea
               className='input-box'
               type='text'
               onChange={(e) => this.handleInput(e.target.value)}
            >

            </textarea>
         </div>
      )
   }
}
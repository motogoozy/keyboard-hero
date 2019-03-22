import React, { Component } from 'react';
import './TypingTest.scss';
import axios from 'axios';

export default class TypingTest extends Component {
   state = {
      originalText: '',
      originalTextArray: [],
      userInput: '',
      userInputArray: [],
   }

   componentDidMount = async () => {
      await this.getParagraph();
   }

   getParagraph = async () => {
      //Picks a random paragraph from database
      const paragraphId = await Math.floor((Math.random() * 7) + 1);
      const res = await axios.get(`/api/paragraph/${paragraphId}`);
      await this.setState({ originalText: res.data[0].paragraph_text });
      await this.setState({ originalTextArray: this.state.originalText.split('') });
   }

   handleInput = async (inputString) => {
      const { userInput } = this.state;
      await this.setState({ userInput: inputString });
      await this.setState({ userInputArray: userInput.split('') })
   }


   render() {
      const { originalText, originalTextArray, userInput, userInputArray } = this.state;
      // Spell checking
      let displayParagraph = originalTextArray.map((letter, index) => {
         if (!userInput[index]) {
            return (
               <span style={{ color: 'gray' }} key={index}>{letter}</span>
            )
         } else if (letter === userInput[index]) {
            return (
               <span style={{ color: 'green' }} key={index}>{letter}</span>
            )
         } else if (letter !== userInput[index]) {
            return (
               <span style={{ backgroundColor: 'red' }} key={index}>{letter}</span>
            )
         }
      })


      return (
         <div className='typing-test'>
            <div className='text-window'>
               {
                  originalText === userInput && userInput.length > 1 ? alert('Success!') : <>{displayParagraph}</>
               }
            </div>
            <textarea className='input-box' type='text' onChange={(e) => this.handleInput(e.target.value)} >

            </textarea>
         </div>
      )
   }
}
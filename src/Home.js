import './Home.css';
import React, {Component} from 'react';
import cross from './2.Blank_Cross.png'
import distractor1 from './3.DistractorA.png'
import distractor2 from './5.DistractorB.png'
import distractor3 from './7.DistractorC.png'
import distractor4 from './9.DistractorD.png'
import distractor5 from './11.DistractorE.png'
import distractor6 from './13.DistractorF.png'
import distractor7 from './15.DistractorG.png'
import Image1 from './4.TargetA.png'
import Image2 from './6.TargetB.png'
import Image3 from './8.TargetC.png'
import Image4 from './10.TargetD.png'
import Image5 from './12.TargetE.png'
import Image6 from './14.TargetF.png'
import Image7 from './16.TargetG.png'


var logs = {}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gamestate : 0, //not started = 0, cross = 1, distractors - 2, final image = 3, finished = 4
            currentImage: -1,
            blankscreen : false,
            currTimeInMilliseconds: 0,
            final: [
                Image1,
                Image2,
                Image3,
                Image4,
                Image5,
                Image6,
                Image7
            ],
            distractors: [
                distractor1,
                distractor2,
                distractor3,
                distractor4,
                distractor5,
                distractor6,
                distractor7
            ],
            answer: [
                1,
                1,
                0,
                1,
                0,
                1,
                0
            ] // 1 - present, 0 - absent
        }
    }

    startGame() {
        this.setState({gamestate : 1, blankscreen : true, currentImage: this.state.currentImage + 1, currTime : new Date().getTime() + 4500});
        setTimeout(() => {
            this.setState({blankscreen: false});
        }, 1000); // 1000 ms blank
        setTimeout(() => {
            this.setState({gamestate: 2});
        }, 1500); // 500 ms cross
        setTimeout(() => {
            this.setState({gamestate: 3});
        }, 4500); // 2000 ms distractors

    }

    respond() {
        var currentImage = this.state.currentImage + 1;
        if(currentImage < this.state.final.length) {
            this.startGame();
        } else {
            this.setState({gamestate: 4});
        }
    }

    targetFound(value) {
        var respondTime = new Date().getTime();
        var timeElapsed = respondTime - this.state.currTime;
        console.log(timeElapsed);
        var response = "";
        if(this.state.answer[this.state.currentImage] == value) {
            console.log("User Responded Correctly")
            response = "Right"
        } else {
            console.log("User Responded Incorrectly")
            response = "Wrong"
        }
        logs[this.state.currentImage] = {time: timeElapsed, response: response};
        this.respond();
    }

    render() {
        let display;
        if(this.state.blankscreen) {
            display = ''
        } else {
            switch(this.state.gamestate) {
                case 0:
                    display = <button type="button" className="Button Text" onClick={() => this.startGame()}>Start</button>
                    break;
                case 1:
                    display = 
                    <div>
                        <img class="Image" src = {cross}/>
                        <div class="ButtonArea">
                            <button type="button" className="Button ButtonFound Text" onClick={() => this.targetFound(1)}>Present</button>
                            <button type="button" className="Button ButtonNotFound Text" onClick={() => this.targetFound(0)}>Not Present</button>
                        </div>
                    </div> 
                    break;   
                case 2:
                    display = 
                    <div>
                        <img class="Image" src = {this.state.distractors[this.state.currentImage]}/>
                        <div class="ButtonArea">
                            <button type="button" className="Button ButtonFound Text" onClick={() => this.targetFound(1)}>Present</button>
                            <button type="button" className="Button ButtonNotFound Text" onClick={() => this.targetFound(0)}>Not Present</button>
                        </div>
                    </div> 
                    break;
                case 3:
                    display = 
                    <div>
                        <img class="Image" src = {this.state.final[this.state.currentImage]}/>
                        <div class="ButtonArea">
                            <button type="button" className="Button ButtonFound Text" onClick={() => this.targetFound(1)}>Present</button>
                            <button type="button" className="Button ButtonNotFound Text" onClick={() => this.targetFound(0)}>Not Present</button>
                        </div>
                    </div> 
                    break;   
                case 4:
                    display = 
                    <div>
                        <div className="Text">Your Results</div>
                        <table className="Table">
                            <tr>
                                <th>Answer</th>
                                <th>Response</th> 
                            </tr>
                            <tr>
                                <th>{logs[0].response}</th>
                                <th>{logs[0].time}</th> 
                            </tr>
                            <tr>
                                <th>{logs[1].response}</th>
                                <th>{logs[1].time}</th> 
                            </tr>
                            <tr>
                                <th>{logs[2].response}</th>
                                <th>{logs[2].time}</th> 
                            </tr>     
                            <tr>
                                <th>{logs[3].response}</th>
                                <th>{logs[3].time}</th> 
                            </tr>  
                            <tr>
                                <th>{logs[4].response}</th>
                                <th>{logs[4].time}</th> 
                            </tr>  
                            <tr>
                                <th>{logs[5].response}</th>
                                <th>{logs[5].time}</th> 
                            </tr>  
                            <tr>
                                <th>{logs[6].response}</th>
                                <th>{logs[6].time}</th> 
                            </tr>                       
                        </table>
                    </div>
                    break;
            }
        }
        return (          
            <div class="container" className="Home">
              {display}
            </div>
        );
    }
  }

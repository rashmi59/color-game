import './Home.css';
import React, {Component} from 'react';
import logo from './logo.svg';
import focus from './focus.gif'

var logs = {}
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gamestate : 0, //not started = 0, focus = 1, real image = 2, finished = 3
            currentImage: -1,
            blankscreen : false,
            currTimeInMilliseconds: 0,
            images: [
                logo,
                logo
            ],
            answer: [
                0,
                1
            ] // 1 - present, 0 - absent
        }
    }

    startGame() {
        this.setState({gamestate : 1, blankscreen : true, currentImage: this.state.currentImage + 1, currTime : new Date().getTime() + 1000});
        setTimeout(() => {
            this.setState({blankscreen: false});
        }, 500);
        setTimeout(() => {
            this.setState({gamestate: 2});
        }, 1000);
    }

    respond() {
        var currentImage = this.state.currentImage + 1;
        if(currentImage < this.state.images.length) {
            this.startGame();
        } else {
            this.setState({gamestate: 3});
        }
    }

    targetFound(value) {
        var respondTime = new Date().getTime();
        var timeElapsed = respondTime - this.state.currTime;
        console.log(timeElapsed);
        var response = "";
        if(this.state.answer[this.state.currentImage] == value) {
            console.log("User Responded Correctly")
            response = "User Responded Correctly"
        } else {
            console.log("User Responded Incorrectly")
            response = "User Responded Correctly"
        }

        logs[this.state.currentImage] = [timeElapsed, response];
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
                case 2:
                    display = 
                    <div>
                        <img src = {logo}/>
                        <div class="ButtonArea">
                            <button type="button" className="Button ButtonFound Text" onClick={() => this.targetFound(1)}>Present</button>
                            <button type="button" className="Button ButtonNotFound Text" onClick={() => this.targetFound(0)}>Not Present</button>
                        </div>
                    </div> 
                    break;
                case 1:
                    display = 
                    <div>
                        <img className="Image" src = {focus}/>
                    </div> 
                    break;    
                case 3:
                    display = <div className="Text">Game Over!</div>
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
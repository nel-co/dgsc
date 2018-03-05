import React, { Component } from 'react';
import './App.css';

import WelcomeScreen from '../Welcome_Screen/WelcomeScreen';
import OptionScreen from '../OptionScreens/OptionScreen';
import HoleScreen from '../HoleScreen/HoleScreen';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newGame: false, // To Start Game
      addingNewPlayer: false, // To Toggle Player Modal
      addingNewCourse: false, // To Toggle Course Modal
      playersPicked: false, // To Display Player Screen
      coursePicked: false, // To Display Course Screen
      gameStarted: false,
      playersPlaying: [], // Stores Players Names to show on scorecard
      savedPlayers: JSON.parse(localStorage.getItem('savedPlayers')) || [], //Saves players names 
      savedCourses: JSON.parse(localStorage.getItem('savedCourses')) || [], // Saves course info
      currentGame: {
        courseName: '',
        holes: '',
        par: [],
        players: [
          {
            name: '',
            score: [] // push score after each slide
          }
        ]
      }
    }
  }


  // Sets New Game to True
  handleNewGame = () => {
    this.setState({
      newGame: true
    })
  }

  // Toggles the New Player Modal Open/Close 
  toggleNewPlayerModal = () => {
    this.setState({
      addingNewPlayer: !this.state.addingNewPlayer
    })
  }

    // Toggles the New Course Modal Open/Close 
    toggleNewCourseModal = () => {
      this.setState({
        addingNewCourse: !this.state.addingNewCourse
      })
    }

  // Stores New Player from User Input into savedPlayers State and Updates Local Storage
  saveNewPlayer = () => {
    const playerInput = document.querySelector('input[name="new-player-name"]');
    if(playerInput.value.length > 0) {
      const newPlayer = playerInput.value.trim();
      this.setState({
        savedPlayers: [...this.state.savedPlayers, newPlayer],
        addingNewPlayer: false
      }, () => {
          localStorage.setItem('savedPlayers', JSON.stringify(this.state.savedPlayers));
      })
    }
  }

  // Stores selected players into playersPlaying array
  savePlayersPicked = () => {
    if(document.querySelector('.option-wrapper')) {
      const playerList = Array.from(document.querySelectorAll('.option-single'));
      const playersArray = playerList.filter(player => {
        return player.querySelector('.option-select').classList.contains('selected');
      });
      const finalPlayersArray = playersArray.map(player => {
        return player.innerText;
      });
      let playersPickedArray = [];
      if(finalPlayersArray.length <= 4) {
        for(let i = 0; i < finalPlayersArray.length; i++) {
          let playersPickedObject = {};
          playersPickedObject['name'] = finalPlayersArray[i].replace(/[\n]/g, "");
          playersPickedObject['score'] = [];
          playersPickedArray.push(playersPickedObject);
        }
      }

      if(playersPickedArray.length > 0) {
        this.setState({
          playersPlaying: playersPickedArray,
          playersPicked: true
        }, () => {
          // console.log(playersPickedArray);
        });
      }
    }
  }

    // Stores New Course from User Input into savedCourses State and Updates Local Storage
    saveNewCourse = () => {
      const courseNameInput = document.querySelector('input[name="new-course-name"]');
      const courseHoleInput = document.querySelector('input[name="new-course-holes"]');
      const courseLength = parseInt(courseHoleInput.value)
      if(courseNameInput.value.length > 0 && courseHoleInput.value > 0) {
        const courseName = courseNameInput.value.trim();
        let newCourseData = {
          courseName: courseName,
          holes: courseLength,
          par: new Array(courseLength).fill(3)
        }
        this.setState({
          savedCourses: [...this.state.savedCourses, newCourseData],
          addingNewCourse: false
        }, () => {
          localStorage.setItem('savedCourses', JSON.stringify(this.state.savedCourses));
        })
      }
    }

    saveCoursePicked = () => {
      if(document.querySelector('.option-wrapper') &&  this.state.savedCourses.length) {
        const courseList = Array.from(document.querySelectorAll('.option-single'));
        const selectedCourse = courseList.filter(course => {
          return course.querySelector('.option-select').classList.contains('selected');
        });
        const finalCourseArray = selectedCourse.map(course => {
          return course.innerText;
        });

        const courseName = finalCourseArray[0].replace(/[\n]/g, ""); // Name of Course User Selected
        let currentGameCopy = [...this.state.currentGame]; // Copy of current game object

        for (let x = 0; x < this.state.savedCourses.length; x++) {
          if(this.state.savedCourses[x].courseName.toLowerCase() === courseName.toLowerCase()) {
            currentGameCopy.players = this.state.playersPlaying;            
            currentGameCopy.course = this.state.savedCourses[x].courseName;
            currentGameCopy.holes = this.state.savedCourses[x].holes;
            if(this.state.savedCourses[x].par.length > 0) {
              currentGameCopy.par = this.state.savedCourses[x].par;              
            } else {
              currentGameCopy.par = Array(this.state.savedCourses[x].holes).fill(3);
              // this.state.savedCourses[x].par = Array(this.state.savedCourses[x].holes).fill(3);
            }
            this.setState({
              currentGame: currentGameCopy,
              coursePicked: true,
              gameStarted: true
            }, () => {
              console.log(this.state.currentGame)
            })
            break;
          }
        }
      }
    }

    handleParChange = (courseName, index, newPar) => {
      if(document.querySelector('.hole-screen-par input')) {
        console.log(courseName + ' ' + index + ' ' + newPar);
        let savedCourses = [...this.state.savedCourses];
          for(let i = 0; i < this.state.savedCourses.length; i++) {
            if(this.state.savedCourses[i].courseName === courseName) {
              savedCourses[i].par[index] = newPar;
              this.setState({savedCourses})
              const currentGame = {...this.state.currentGame};
              currentGame.par[index] = newPar;
              this.setState({currentGame}, () => {
                console.log(currentGame)
              });
              localStorage.setItem('savedCourses', JSON.stringify(this.state.savedCourses));
            }
        }
      }
    }

    handlePlayerScore = (playerScore, holeIndex, playerIndex) => {
      let currentGameCopy = Object.assign({}, this.state.currentGame); // Copy of current game object
      if(currentGameCopy.players[playerIndex].score.length === 0) {
        currentGameCopy.players[playerIndex].score.push(playerScore);
        this.setState({currentGameCopy});
      } else if(currentGameCopy.players[playerIndex].score[holeIndex]) {
        currentGameCopy.players[playerIndex].score[holeIndex] = playerScore;
        this.setState({currentGameCopy});
      } else {
        currentGameCopy.players[playerIndex].score.push(playerScore);
        this.setState({currentGameCopy});        
      }
    }

    handleFinishRoundClick = () => {
      this.setState({
        newGame: false, // To Start Game
        playersPicked: false, // To Display Player Screen
        coursePicked: false, // To Display Course Screen
        gameStarted: false,
        playersPlaying: [], // Stores Players Names to show on scorecard 
      })
    }

  render() {
    const props = {
      newGame: this.state.newGame,
      addingNewPlayer: this.state.addingNewPlayer,
      savedPlayers: this.state.savedPlayers,
      playersPicked: this.state.playersPicked,
      savedCourses: this.state.savedCourses,
      addingNewCourse: this.state.addingNewCourse,
      coursePicked: this.state.coursePicked,
      currentGame: this.state.currentGame,

      handleNewGame: this.handleNewGame,      
      toggleNewPlayerModal: this.toggleNewPlayerModal,
      toggleNewCourseModal: this.toggleNewCourseModal,
      saveNewPlayer: this.saveNewPlayer,
      savePlayersPicked: this.savePlayersPicked,
      saveNewCourse: this.saveNewCourse,
      saveCoursePicked: this.saveCoursePicked,
      handleParChange: this.handleParChange,
      handlePlayerScore: this.handlePlayerScore,
      handleFinishRoundClick: this.handleFinishRoundClick,
    };
    return (
      <div className="App">
        { !this.state.newGame ? <WelcomeScreen {...props} /> : <OptionScreen {...props} /> }
        { this.state.gameStarted ? <HoleScreen {...props} /> : null }
      </div>
    );
  }
}

export default App;
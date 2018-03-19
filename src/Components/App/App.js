import React, { Component } from 'react';
import './App.css';

import WelcomeScreen from '../Welcome_Screen/WelcomeScreen';
import OptionScreen from '../OptionScreens/OptionScreen';
import HoleScreen from '../HoleScreen/HoleScreen';
import Stats from '../StatScreen/Stats';

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
      // savedPlayers: JSON.parse(localStorage.getItem('savedPlayers')) || [], //Saves players names 
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
      },
      savedPlayers: JSON.parse(localStorage.getItem('savedPlayers')) || [
        // {
        //   playerName: 'Nelson',
        //   prevRounds: [
        //     {
        //       courseName: 'Shoally',
        //       scores: [
        //         [3,2,2,2,3,3,2,3],
        //         [2,2,3,3,3,4,2,3],
        //         [3,3,3,3,4,3,2,3]
        //       ]
        //     },
        //     {
        //      courseName: 'upstate',
        //      scores: [
        //        [3,2,2,2,3,3,2,3],
        //        [3,2,3,3,3,4,2,3]
        //      ]
        //    },
        //   ]
        // }
      ]
    }
  }
  
  // Sets New Game to True
  handleNewGame = () => {
    this.setState({
      newGame: true
    })
  }

  handlePlayerScreenBack = () => {
    this.setState({
      newGame: false
    })
  }

  handleCourseScreenBack = () => {
    this.setState({
      playersPicked: false
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
    if(playerInput.value.length > 0 && playerInput.value.length <= 35) {
      let newPlayer = {};
      newPlayer.playerName = playerInput.value.trim();
      newPlayer.prevRounds = [];
      this.setState({
        savedPlayers: [...this.state.savedPlayers, newPlayer],
        addingNewPlayer: false
      }, () => {
          localStorage.setItem('savedPlayers', JSON.stringify(this.state.savedPlayers));
      });
      // set timeout call to select last player
      setTimeout(() => {
        this.selectNewPlayer();
      }, 0);
    }
  }

  selectNewPlayer = () => {
    if(document.querySelector('.option-single')) {
      const playerList = Array.from(document.querySelectorAll('.option-single'));
      playerList[playerList.length - 1].childNodes[0].classList.add('selected');
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

  removePlayer = (index) => {
    let question = window.confirm('Are you sure you want to remove this player?');
    if(question) {
      let savedPlayersCopy = [...this.state.savedPlayers];
      savedPlayersCopy.splice(index, 1);
      this.setState({
        savedPlayers: savedPlayersCopy
      }, () => {
        localStorage.setItem('savedPlayers', JSON.stringify(this.state.savedPlayers));    
       });
    } else {
      return;
    }
  }

    // Stores New Course from User Input into savedCourses State and Updates Local Storage
    saveNewCourse = () => {
      const courseNameInput = document.querySelector('input[name="new-course-name"]');
      const courseHoleInput = document.querySelector('input[name="new-course-holes"]');
      const courseLength = parseInt(courseHoleInput.value)
      if(courseNameInput.value.length > 0 && courseHoleInput.value > 0 && courseHoleInput.value <= 27) {
        const courseName = courseNameInput.value.trim();
        let newCourseData = {
          courseName: courseName,
          holes: courseLength,
          par: new Array(courseLength).fill(3),
          notes: []
        }
        this.setState({
          savedCourses: [...this.state.savedCourses, newCourseData],
          addingNewCourse: false
        }, () => {
          localStorage.setItem('savedCourses', JSON.stringify(this.state.savedCourses));
        });
        setTimeout(() => {
          this.selectNewCourse();
        }, 0);
      }
    }

    selectNewCourse = () => {
      if(document.querySelector('.option-single')) {
        const courseList = Array.from(document.querySelectorAll('.option-single'));
        courseList.map(course => {
          course.childNodes[0].classList.remove('selected');
        });
        courseList[courseList.length - 1].childNodes[0].classList.add('selected');
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
            currentGameCopy.notes = this.state.savedCourses[x].notes;
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

    removeCourse = (index) => {
      let question = window.confirm('Are you sure you want to remove this course?');
      if(question) {
        let savedCoursesCopy = [...this.state.savedCourses];
        savedCoursesCopy.splice(index, 1);
        this.setState({
          savedCourses: savedCoursesCopy
        }, () => {
          localStorage.setItem('savedCourses', JSON.stringify(this.state.savedCourses));
         });
      } else {
        return;
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

    addNote = (courseName) => {
      let savedCoursesCopy = [...this.state.savedCourses];      
      for(let i = 0; i < this.state.savedCourses.length; i++) {
        if(courseName === this.state.savedCourses[i].courseName) {
          let note = document.querySelector('textarea[name="note-text"]');
          if(note !== '') {
            savedCoursesCopy[i].notes.push(note.value);
            this.setState({
              savedCourses: savedCoursesCopy
            }, () => {
              localStorage.setItem('savedCourses', JSON.stringify(this.state.savedCourses));              
            })
            note.value = '';
          }
          note.blur();
        }
      }
    }

    removeNote = (courseName, index) => {
      console.log(index);
      let savedCoursesCopy = [...this.state.savedCourses];
      for(let i = 0; i < this.state.savedCourses.length; i++) {
        if(courseName === this.state.savedCourses[i].courseName) {
          savedCoursesCopy[i].notes.splice(index, 1);
          this.setState({
            savedCoursesCopy
          }, () => {
            localStorage.setItem('savedCourses', JSON.stringify(this.state.savedCourses));
           });
        }
      }
    }

    handleFinishRoundClick = () => {
      this.checkFinishGame();
    }

    checkFinishGame = () => {
      let gameFinished = false;
      for(let i = 0; i < this.state.currentGame.players.length; i++) {
        if(this.state.currentGame.players[i].score.length === this.state.currentGame.par.length) {
          gameFinished = true;
        }
      }
      if(gameFinished) { 
        this.saveStats();
        this.resetGame();
      } else {
        let question = window.confirm("Game stats won't save unless the round is finished. Are you sure you want to stop now?");
        if(question) {
          this.resetGame();
        } else {
          return;
        }
      }
    }

    resetGame = () => {
      this.setState({
        newGame: false, // To Start Game
        playersPicked: false, // To Display Player Screen
        coursePicked: false, // To Display Course Screen
        gameStarted: false,
        playersPlaying: [] // Stores Players Names to show on scorecard 
      });
    }

    saveStats = () => {
      let savedPlayersCopy = [...this.state.savedPlayers];
      const currentGame = this.state.currentGame;
      for(let i = 0; i < currentGame.players.length; i++) {
        console.log('looping current game players');
        for(let j = 0; j < savedPlayersCopy.length; j++) {
          console.log('looping saved players');          
          if(currentGame.players[i].name === savedPlayersCopy[j].playerName) {
            console.log('names match!');
            let scoreArray = currentGame.players[i].score
            savedPlayersCopy[j].prevRounds.push({
              courseName: currentGame.course,
              scores: scoreArray
            });
            console.log(savedPlayersCopy);
            this.setState({savedPlayersCopy}, () => {
              localStorage.setItem('savedPlayers', JSON.stringify(this.state.savedPlayers));                  
            });
          }
        }
      }

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
      handlePlayerScreenBack: this.handlePlayerScreenBack,
      handleCourseScreenBack: this.handleCourseScreenBack,
      toggleNewPlayerModal: this.toggleNewPlayerModal,
      toggleNewCourseModal: this.toggleNewCourseModal,
      saveNewPlayer: this.saveNewPlayer,
      savePlayersPicked: this.savePlayersPicked,
      removePlayer: this.removePlayer,
      saveNewCourse: this.saveNewCourse,
      saveCoursePicked: this.saveCoursePicked,
      removeCourse: this.removeCourse,
      handleParChange: this.handleParChange,
      handlePlayerScore: this.handlePlayerScore,
      handleFinishRoundClick: this.handleFinishRoundClick,
      addNote: this.addNote,
      removeNote: this.removeNote
    };
    return (
      <div className="App">
        <Stats savedPlayers={this.state.savedPlayers} savedCourses={this.state.savedCourses} />
        {/* { !this.state.newGame ? <WelcomeScreen {...props} /> : <OptionScreen {...props} /> } */}
        {/* { this.state.gameStarted ? <HoleScreen {...props} /> : null } */}
      </div>
    );
  }
}

export default App;

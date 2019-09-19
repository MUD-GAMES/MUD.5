import React from 'react';
import RoomInfo from './Components/RoomInfo'
import Commands from './Components/Commands'
import Login from './Components/Login'
import Dungeon from './Components/Dungeon'
import NavBar from './Components/NavBar'
import {CssBaseline, Container} from '@material-ui/core'
import ChatBox from './Components/ChatBox';
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false
    }

  }
  
  tempChangeLogin = () => {
    this.setState(prev => {
      return {loggedIn: ! prev.loggedIn}
    })
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <NavBar tempChangeLogin={this.tempChangeLogin} />
        {!this.state.loggedIn ? <Login /> : (

          <Container>
          <Dungeon />
          <Commands />
          <ChatBox />
          <RoomInfo />

          </Container>
        )}
       
      </div>
    )
  }
}

export default App;

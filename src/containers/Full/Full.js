import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../../views/Home/'
import Team from '../../views/Team/'
import Twitch from '../../views/Twitch/'

class Full extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Overwatch league streamers hub</h1>
          <a href="/"><img src='../img/owl.png' alt="owl-logo" className="rounded mx-auto d-block" style={{width: '10%'}}/></a>
        </header>
        <div className="App-intro">
          <main className="main">            
            <div className="container">
              <Switch>
                <Route path="/twitch" name="Twitch" component={Twitch}/>
                <Route path="/team" name="Team" component={Team}/>
                <Route path="/" name="Home" component={Home}/>
              </Switch>
            </div>
          </main>
        </div>
      </div>
    );
  }

}

export default Full;

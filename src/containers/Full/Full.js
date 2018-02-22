import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import * as _ from 'lodash';
import request from 'request'
import { connect } from 'react-redux';
import { setTeams } from '../../reducers/owl'

import Home from '../../views/Home/'
import Team from '../../views/Team/'

const config = require("../../config.json");

let owlTeams = []
class Full extends Component {

  constructor(props){
    super(props)
    this.getTeams = this.getTeams.bind(this)
    this.checkStreams = this.checkStreams.bind(this)
  }

  componentDidMount(){
    this.getTeams();
  }

  async getTeams(){
    await request('https://api.overwatchleague.com/teams?expand=team.content', (error, response, body) => {
      if(error){
        console.log(`Error: ${error}`);
      }else{
        let data = JSON.parse(body);
        _.forEach(data.competitors, team => {
          let fixedTeam = this.checkStreams(team.competitor)
          owlTeams.push(fixedTeam)
        })        
      }
      this.props.setTeams(owlTeams)
    })
  }

  checkStreams(team){

    let owlUsers = []
     _.forEach(team.players, obj => {
      let twitch = _.find(obj.player.accounts, acc => acc.accountType == 'TWITCH');
      if(twitch){
        owlUsers.push( _.last(twitch.value.split("/")))
      }
    })
    console.log(owlUsers)
    if(owlUsers.length >0 ){
      let options = {
        url: "https://api.twitch.tv/helix/streams?type=live&user_login=overwatchleague",
        headers: {
          'Client-ID': config.clientId
        },      
      }
      request(options, (error, response, body) => {
        console.log(JSON.parse(body))
      })
    }
    return team
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Overwatch league streamers hub</h1>
          <a href="/"><img src='../img/owl.png' className="rounded mx-auto d-block" style={{width: '10%'}}/></a>
        </header>
        <div className="App-intro">
          <main className="main">            
            <div className="container">
              <Switch>
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

const mapStateToProps = (state, ownProps) => (
  {
    ...ownProps,
  })
  
  const mapDispatchToProps = (dispatch, ownProps) => ({
    setTeams: () => {
      dispatch(setTeams(owlTeams))
    }
  })

export default connect(mapStateToProps,mapDispatchToProps)(Full);

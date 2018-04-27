import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import * as _ from 'lodash';
import request from 'request'
import { connect } from 'react-redux';
import { setTeams } from '../../reducers/owl'
import axios from 'axios'

import Home from '../../views/Home/'
import Team from '../../views/Team/'
import Twitch from '../../views/Twitch/'

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const config = require("../../config.json");

let owlTeams = []
class Full extends Component {

  constructor(props){
    super(props)
    this.updateHandle;
    this.updateTime = 3000;
    this.getTeams = this.getTeams.bind(this)
    this.setTeam = this.setTeam.bind(this)
    this.state = {
      blocking: true,
    };
  }

  componentDidMount(){
    this.getTeams();
  }

  async getTeams(){
    await request('https://api.overwatchleague.com/v2/teams?expand=team.content', (error, response, body) => {
      if(error){
        console.log(`Error: ${error}`);
      }else{
        let dataRes = JSON.parse(body);
        dataRes.data.map(async team => {
           this.checkStream(team).then(obj => {
              owlTeams.push(team);
           })
        })
      }
    })
    setTimeout(() => {
      this.setTeam();
    }, this.updateTime);
  }

  setTeam(){
    this.props.setTeams(owlTeams)
    this.setState({
      blocking: false
    })
  }

  componentWillUnmount(){
    clearInterval(this.updateHandle);
  }

  async checkStream(checkTeam){
      let owlPlayers = []
      checkTeam.players.map(async obj => {
          let twitch = _.find(obj.accounts, acc => acc.type == 'TWITCH');
          if(twitch){
              const userName = _.last(twitch.url.split("/"))
              let headerConfig = {
                  headers: {'Client-ID': config.clientId},
                };
              let response = await axios.get("https://api.twitch.tv/kraken/streams/"+userName,headerConfig)
              obj.streamStats = response.data;
          }
          owlPlayers.push(obj);
      })
    checkTeam.players = owlPlayers;
    return checkTeam
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
            <BlockUi tag="div" blocking={this.state.blocking}>
              <Switch>
                <Route path="/twitch" name="Twitch" component={Twitch}/>
                <Route path="/team" name="Team" component={Team}/>
                <Route path="/" name="Home" component={Home}/>
              </Switch>
            </BlockUi>
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
    teams: state.teams
  })
  
  const mapDispatchToProps = (dispatch, ownProps) => ({
    setTeams: () => {
      dispatch(setTeams(owlTeams))
    }
  })

export default connect(mapStateToProps,mapDispatchToProps)(Full);

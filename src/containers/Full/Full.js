import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import * as _ from 'lodash';
import request from 'request'
import { connect } from 'react-redux';
import { setTeams } from '../../reducers/owl'

import Home from '../../views/Home/'
import Team from '../../views/Team/'


let owlTeams = []
class Full extends Component {

  constructor(props){
    super(props)
    this.getTeams = this.getTeams.bind(this)
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
          owlTeams.push(team.competitor)
        })        
      }
      this.props.setTeams(owlTeams)
    })
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

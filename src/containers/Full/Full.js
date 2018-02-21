import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import * as _ from 'lodash';
import request from 'request'
import { connect } from 'react-redux';
import { setTeams } from '../../actions/owl'

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
      <div className="app">
        <div className="app-body">
          <main className="main">            
            <div className="container">
              <Switch>
                <Route path="/" name="Home" component={Home}/>
                <Route path="/Team" name="Team" component={Team}/>
                <Redirect from="/" to="/"/>
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

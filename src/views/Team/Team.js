import React, { Component } from 'react';
import './Team.css';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import queryString from 'query-string';

import TeamCards from '../../components/TeamCards'
class Team extends Component {
  
  componentWillMount(){
    console.log(this.props)
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Overwatch league streamers hub</h1>
        </header>
        <div className="App-intro">
            <div className="col-md-12 mt-5">
              <div className="row">
              {this.props.teams.map((team,index) => {
                  return <TeamCards key={index} team={team} />
              })}
              </div>
            </div>
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

export default connect(mapStateToProps)(Team);

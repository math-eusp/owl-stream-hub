import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';

import TeamCards from '../../components/TeamCards'
class Home extends Component {
  
  render() {
    return (
        <div className="col-md-12 mt-5">
          <div className="row">
          {this.props.teams && this.props.teams.map((team,index) => {
              return <TeamCards key={index} team={team} />
          })}
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

export default connect(mapStateToProps)(Home);

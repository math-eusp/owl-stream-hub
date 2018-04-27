import React, { Component } from 'react';
import './Twitch.css';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import queryString from 'query-string';

import PlayerCards from '../../components/PlayerCards'
class Twitch extends Component {


  componentWillMount(){
    const parsedURLParams = queryString.parse(this.props.location.search);
    this.setState({
      ...parsedURLParams
    })
  }

  componentWillReceiveProps(nextProps){
    this.props = nextProps
    let team = _.find(this.props.teams, team => { console.log(this.state.id,team.id); return team.id == this.state.id })
    this.setState({
      team
    })
  }

  render() {
    return (
        <div className="col-md-12 mt-5">
          <img src={this.state.team ? this.state.team.logo : ''}  className="img-fluid" style={{width: '20%'}}/>
          <div className="row">
          {this.state.team && this.state.team.players.map((obj,index) => {
              return <PlayerCards key={index} player={obj.player} team={this.state.team}/>
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

export default connect(mapStateToProps)(Twitch);

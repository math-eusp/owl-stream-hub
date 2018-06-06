import React, { Component } from 'react';
import './Team.css';
import { connect } from 'react-redux';
import queryString from 'query-string';
import OwlApi from '../../components/OwlAPI'
import PlayerCards from '../../components/PlayerCards'
class Team extends Component {
  constructor(props){
    super(props);
    this.OwlAPI = new OwlApi();
    this.state = {
      team: null
    }
  }

  componentWillMount(){
    const parsedURLParams = queryString.parse(this.props.location.search);
    this.OwlAPI.GetTeam(parsedURLParams.id).then(res => {
      this.setState({
        team: res
      })
    })
  }

  render() {
    return (
        <div className="col-md-12 mt-5">
          <div className="owl-team-logo">
            <img src={this.state.team ? this.state.team.logo.mainName.png : ''} alt="team-logo"  className="img-fluid" style={{width: '20%'}}/>
          </div>
          <div className="row">
          {this.state.team && this.state.team.players.map((obj,index) => {
              return <PlayerCards key={index} player={obj} team={this.state.team}/>
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

export default connect(mapStateToProps)(Team);

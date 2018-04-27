import React, { Component } from 'react';
import './TeamCards.css';

import { connect } from 'react-redux';
import * as _ from 'lodash';
import axios from 'axios'
import { updateTeam } from '../../reducers/owl';

const config = require("../../config.json");

class TeamCards extends Component {
  constructor(props){
      super(props);
  }

    
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
}

  render() {
    let counter = 0
    if(this.props.team.players){        
        this.props.team.players.map(obj => {
            if(obj.streamStats){
                console.log(obj.streamStats)
                if(obj.streamStats.stream)
                    counter += 1;
            }
        })
    }
    let grayscale = 100;  
    if(counter > 0){
        grayscale = 0;
    }
    return (
        <div className="col-md-3 col-sm-6 col-xs-4" style={{marginBottom: '20px'}}>
            <a href={`/team?id=${this.props.team.id}`}>
                <div className="outer-container" style={{opacity: 1}}>
                    <div className="card-container">
                        <div className="team-card" style={{backgroundImage: `url('${this.props.team.logo.main.png}')`, filter: `grayscale(${grayscale}%)`}}></div>
                        <div className="card-team-online-section">
                            <h3 className='team-name' style={{padding: '0px; color: rgb(0, 102, 170)',margin: '0px'}}>{this.props.team.name}</h3>
                            <span style={{color: 'rgb(28, 28, 28)'}}>{counter} players online</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => (
    {
      ...ownProps,
    })
    
    const mapDispatchToProps = (dispatch, ownProps) => ({
      updateTeam: (team) => {
        dispatch(updateTeam(team))
      }
    })
  
  export default connect(mapStateToProps,mapDispatchToProps)(TeamCards);

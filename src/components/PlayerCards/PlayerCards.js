import React, { Component } from 'react';
import './PlayerCards.css';

class PlayerCards extends Component {
  
  constructor(props){
      super(props)
      this.state = {
          status: 'Offline'
      }
  }
  componentWillMount(){
    if(this.props.player.streamStats){
        if(this.props.player.streamStats.stream)
            this.setState({
                status: 'Online'
            })
    }
  }
  render() {
    let grayscale = 100;
    let color = 'red';
    if(this.state.status !== 'Offline'){
        grayscale = 0;
        color = 'green';
    }
    let teamColor = this.props.team.colors.primary.color;
    return (
        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6" style={{marginBottom: '20px'}}>
            <a href={`/twitch?id=${this.props.player.id}`}>
                <div className="player-card">
                    <div className="player-headshot" style={{backgroundImage: `url('${this.props.player.headshot}')`, filter: `grayscale(${grayscale}%)`}}></div>
                    <div className="player-data">
                        <div className="card-player-section" style={{borderTop: `5px solid ${teamColor}`}}>
                            <div className="player-name-font" style={{color: teamColor, filter: 'brightness(50%)'}}>
                                {this.props.player.name}
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-6 col-xs-6">
                                    <span style={{color: teamColor, filter: 'brightness(20%)'}}>{this.props.player.role}</span>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-6 col-xs-6">
                                    <span style={{color}}>{this.state.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
  }
}

export default PlayerCards;


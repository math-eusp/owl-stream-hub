import React, { Component } from 'react';
import * as _ from 'lodash';
import './PlayerCards.css';

class PlayerCards extends Component {
  render() {
    let teamColor = _.head(this.props.team.content.colors).color.color;
    return (
        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6" style={{marginBottom: '20px'}}>
            <a href={`/twitch?id=${this.props.player.id}`}>
                <div className="player-card">
                    <div className="player-headshot" style={{backgroundImage: `url('${this.props.player.headshot}')`, filter: 'grayscale(100%)'}}></div>
                    <div className="player-data">
                        <div className="card-player-section" style={{borderTop: `5px solid ${teamColor}`}}>
                            <div className="player-name-font" style={{color: teamColor, filter: 'brightness(50%)'}}>
                                {this.props.player.name}
                            </div>
                            <span style={{color: 'black'}}>Offline</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
  }
}

export default PlayerCards;


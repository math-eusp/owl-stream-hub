import React, { Component } from 'react';
import * as _ from 'lodash';
import './PlayerCards.css';

class PlayerCards extends Component {
  render() {
    return (
        <div className="col-md-3 col-sm-6 col-xs-4" style={{marginBottom: '20px'}}>
            <a href={`/stream/${this.props.player.id}/${this.props.player.name}/`}>
                <div className="outer-container" style={{opacity: 1}}>
                    <div className="card-container">
                        <div className="team-card" style={{backgroundImage: `url('${this.props.player.headshot}')`, filter: 'grayscale(100%)'}}></div>
                        <div className="card-player-online-section" style={{borderTop: `5px solid ${_.head(this.props.team.content.colors).color.color}`}}>
                            <h3 style={{padding: '0px; color: rgb(0, 102, 170)',margin: '0px', color: _.head(this.props.team.content.colors).color.color, filter: 'brightness(50%)'}}>{this.props.player.name}</h3>
                            <span style={{color: 'rgb(28, 28, 28)'}}>OFFLINE</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
  }
}

export default PlayerCards;

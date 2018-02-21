import React, { Component } from 'react';
import './TeamCards.css';

class TeamCards extends Component {
  render() {
    return (
        <div className="col-md-3 col-sm-6 col-xs-4" style={{marginBottom: '20px'}}>
            <a href={`/team?id=${this.props.team.id}`}>
                <div className="outer-container" style={{opacity: 1}}>
                    <div className="card-container">
                        <div className="team-card" style={{backgroundImage: `url('${this.props.team.logo}')`, filter: 'grayscale(100%)'}}></div>
                        <div className="card-team-online-section">
                            <h3 className='team-name' style={{padding: '0px; color: rgb(0, 102, 170)',margin: '0px'}}>{this.props.team.name}</h3>
                            <span style={{color: 'rgb(28, 28, 28)'}}>0 players online</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
  }
}

export default TeamCards;

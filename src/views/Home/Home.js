import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { setTeams } from '../../reducers/owl'
import TeamCards from '../../components/TeamCards'
import OwlApi from '../../components/OwlAPI'
class Home extends Component {
  constructor(props){
    super(props);
    this.OwlAPI = new OwlApi();
    this.state = {
      teams: [],
      blocking: true
    }
  }

  componentWillMount(){
    this.OwlAPI.GetAllTeams().then( obj => {
        this.setState({
          teams: obj,
          blocking: false
        })
    })
  }

  render() {
    return (
        <div className="col-md-12 mt-5">
          <div className="row">
            {this.state.teams.map((team,index) => {
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
  
  const mapDispatchToProps = (dispatch, ownProps) => ({
    setTeams: (owlTeams) => {
      dispatch(setTeams(owlTeams))
    }
  })

export default connect(mapStateToProps,mapDispatchToProps)(Home);

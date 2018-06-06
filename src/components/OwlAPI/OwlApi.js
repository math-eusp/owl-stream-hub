import axios from 'axios';
const OWL_API_ENDPOINT = 'https://api.overwatchleague.com/v2/'

const config = require("../../config.json");
class OwlApi {
  constructor(){
      this.headerConfig = {
        headers: {'Client-ID': config.clientId},
      };
  }
  /* TEAMS */
  GetAllTeams(){
    return new Promise((resolve, reject) => {
      axios.get(`${OWL_API_ENDPOINT}teams?expand=team.content`)
        .then( (res) => {
            const response = JSON.parse(res.request.response);
            resolve(response.data);
        })
        .catch((error) => {
            const response = JSON.parse(error.request.response);
            reject(response);
        });
    }).catch((error) => {
        this.throwError(error);
    })
  }

  GetTeam(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${OWL_API_ENDPOINT}teams/${id}?expand=team.content`)
        .then( (res) => {
            const response = JSON.parse(res.request.response);
            resolve(response.data);

        })
        .catch((error) => {
            const response = JSON.parse(error.request.response);
            reject(response);
        });
    }).catch((error) => {
        this.throwError(error);
    })
  }


  GetStreamData(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.twitch.tv/kraken/streams/${id}`,this.headerConfig)
        .then( (res) => {
            const response = JSON.parse(res.request.response);
            resolve(response.data);

        })
        .catch((error) => {
            const response = JSON.parse(error.request.response);
            reject(response);
        });
    }).catch((error) => {
        this.throwError(error);
    })
  }

}

export default OwlApi;

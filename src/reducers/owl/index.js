
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
        case 'SET_TEAMS':
          return { 
            teams: action.teams,
          }      
        default:
          return state
      }
}

export const setTeams = (teams) => (
  {
    type: 'SET_TEAMS',
    teams
  })
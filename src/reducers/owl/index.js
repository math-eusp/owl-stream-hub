
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
        case 'SET_TEAMS':
          return { 
            teams: action.teams,
          }
        case 'UPDATE_TEAM':
          return {
            teams: state.teams.map(team => {
                return team.id == action.team.id ? action.team : team
            })
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

  export const updateTeam = (team) => (
    {
      type: 'UPDATE_TEAM',
      team
    })
const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TEAMS':
          return { 
            teams: action.teams,
          }      
        default:
          return state
      }
}

export default rootReducer
const initialState = {
  currBoard: null,
  boards: [],
}

export function boardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards }
    case 'ADD_BOARD':
      return { ...state, boards: [...state.boards, action.board] }
    case 'UPDATE_BOARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board._id === action.board._id ? action.board : board
        )
      }
    case 'REMOVE_BOARD':
      return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
    case 'SET_CURR_BOARD':
      return { ...state, currBoard: action.currBoard }
    default:
      return state
  }
}

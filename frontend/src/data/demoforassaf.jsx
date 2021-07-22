




toggleTaskMember = (task, member) => {
    const board = this.props.currBoard;
    taskService.toggleTaskMember(task, member)
    this.props.saveBoard(board)
}


function toggleTaskMember(task, member) {
    var memberIdx = -1
    memberIdx = task.members?.findIndex(taskMember => taskMember._id === member._id)
    if (memberIdx >= 0) {
        task.members.splice(memberIdx, 1)
    } else {
        if (!task.members) task.members = []
        task.members.push(member)
    }
}





























toggleTaskMember()


export function saveBoard(board) {
    const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD'
    return async dispatch => {
        try {
            const savedBoard = await boardService.save(board)
            dispatch({ type, board: savedBoard })
        } catch (err) {
            console.log('BoardActions: err in save/update board', err)
        }
    }
}










async function save(board) {
    if (board._id) {
        return await httpService.put(`board/${board._id}`, board)
    } else {
        return await httpService.post('board', board)
    }
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
                    board._id === action.board._id ? action.board : board)
            }
        case 'REMOVE_BOARD':
            return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
        case 'SET_CURR_BOARD':
            return { ...state, currBoard: action.currBoard }
        default:
            return state
    }
}

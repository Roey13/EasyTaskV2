import { boardService } from '../../services/boardService'
import { socketService, SOCKET_EVENT_BOARD_UPDATED } from '../../services/socketService'

export function loadBoards() {
    return async dispatch => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {}
    }
}

export function saveBoard(board) {
    const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD'
    return async dispatch => { 
        try {
            const savedBoard = await boardService.save(board)
            dispatch({ type, board: savedBoard })
            socketService.emit('board updated', board)
        } catch (err) {
            console.log('BoardActions: err in save/update board', err)
        }
    }
}


export function removeBoard(boardId) {
    return async dispatch => {
        try {
            await boardService.remove(boardId)
            dispatch({ type: 'REMOVE_BOARD', boardId })
        } catch (err) {
            console.log('BoardActions: err in removeBoard', err)
        }
    }
}

export function setBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_CURR_BOARD', currBoard: board })
        } catch (err) {
            console.log('BoardActions: err in setBoard', err)
        }
    }
}
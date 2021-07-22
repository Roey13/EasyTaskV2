import { storageService } from './asyncStorageService.js'
import { utilService } from './utilService.js';
import { httpService } from './httpService.js'

export const boardService = {
    query,
    getById,
    save,
    changeBg,
    remove,
    addActivity,
    changeBoardTitle,
    toggleUser
}

async function query() {
    const boards = await httpService.get('board');
    return boards;
}

function getById(id) {
    return httpService.get(`board/${id}`)
}

function remove(id) {
    return httpService.delete(`board/${id}`)
}

async function save(board) {
    if (board._id) {
        return await httpService.put(`board/${board._id}`, board)
    } else {
        return await httpService.post('board', board)
    }
}

function changeBg(pick, imgUrl, bgColor, board) {
    if (pick === 'photos') return board.style = { ...board.style, imgUrl }
    board.style = { bgColor }
}

function addActivity(loggedInUser, board, group, action, task) {
    const date = new Date()
    const createdAt = utilService.convertToCreatedAtDate(date)
    const member = (loggedInUser) ? loggedInUser : { fullname: 'guest' }
    const newActivity = {
        byMember: member,
        createdAt,
        id: 'a' + utilService.makeId(),
        task,
        group,
        txt: action
    }
    board.activities = [newActivity, ...board.activities]

}

function changeBoardTitle(board, newBoardTitle) {
    if (!newBoardTitle) return false
    board.title = newBoardTitle
    return true
}


function toggleUser(board, user) {
    const userIdx = board.members?.findIndex(boardMember => boardMember._id === user._id)
    if (userIdx >= 0) {
        board.members.splice(userIdx, 1)
        return board
    } else {
        if (!board.members) board.members = []
        board.members = [...board.members, {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl || ''
        }]
    }
}
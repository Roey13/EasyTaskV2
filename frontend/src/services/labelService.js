import { utilService } from "./utilService"

export const labelService = {
    updateLabel,
    addLabelToBoard
}


function updateLabel(board, currLabel, labelUpdates) {
    const currLabelIdx = board.labels.findIndex(label => {
        return label.id === currLabel.id
    })
    labelUpdates = { ...labelUpdates, id: currLabel.id }
    if (!labelUpdates.title) labelUpdates = { ...labelUpdates, title: currLabel.title }
    if (!labelUpdates.color) labelUpdates = { ...labelUpdates, color: currLabel.color }
    board.labels.splice(currLabelIdx, 1, labelUpdates)
}
function addLabelToBoard(board, newLabel) {
    if (!newLabel.color) newLabel = { ...newLabel, color: '#b3bac5' }
    newLabel = { ...newLabel, id: 'l' + utilService.makeId() }
    board.labels.push(newLabel)
}

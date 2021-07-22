import { utilService } from './utilService.js'

export const taskService = {
    getPreview,
    getDatePreview,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    addLabel,
    onRemoveLabel,
    checkLabel,
    toggleTaskMember,
    addComment,
    setTaskDate,
    getTimeStemp,
}

function getPreview(checklists) {
    var todosSum = 0
    var doneTodosSum = 0
    checklists?.forEach(checklist => {
        const currTodosSum = checklist?.todos.length || 0
        var currDoneTodosSum = checklist?.todos.filter(todo => todo.isDone).length
        currDoneTodosSum = (!currDoneTodosSum) ? 0 : currDoneTodosSum
        todosSum += currTodosSum
        doneTodosSum += currDoneTodosSum
    })
    return `${doneTodosSum}/${todosSum}`
}

function getDatePreview(currDate) {
    const month = currDate.substring(5, 7)
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[month - 1].substring(0, 3)
    const day = +currDate.substring(8, 10)
    return `${monthName} ${day}`

}

function setTaskDate(task, date) {
    task.dueDate = {
        date,
        complete: false
    }
}

function addTask(board, groupId, newTitle, loggedInUser) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    if (!board.groups[groupIdx].tasks) board.groups[groupIdx].tasks = []
    const newTask = {
        id: 'c' + utilService.makeId(),
        title: newTitle,
        style: {
            imgUrl: '',
            bgColor: ''
        },
        byMember: loggedInUser,
        comments: [],
        attachments: []
    }
    board.groups[groupIdx].tasks = [...board.groups[groupIdx].tasks, newTask]
    return newTask
}

function addComment(task, txt, comment) {
    var commentIdx = -1
    if (!task.comments) task.comments = [];
    commentIdx = task.comments?.findIndex(taskcomment => taskcomment?.id === comment?.id)
    if (commentIdx >= 0) {
        task.comments.splice(commentIdx, 1)
    } else {
        const comment = {
            "id": "ZdPnm",
            "txt": txt,
            "createdAt": utilService.makeId(),
            "byMember": {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            }
        }
        task.comments.push(comment)
    }
}

function updateTask(board, groupId, updatedTask) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const updatedTaskId = board.groups[groupIdx].tasks.findIndex(task => task.id === updatedTask.id)
    board.groups[groupIdx].tasks.splice(updatedTaskId, 1, updatedTask)
}

function deleteTask(board, groupId, taskId) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    board.groups[groupIdx].tasks.splice(taskIdx, 1)
}

function getTaskById(taskId, groupId, board) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const task = board.groups[groupIdx].tasks.find(task => task.id === taskId)
    return task
}

function addLabel(board, groupId, taskId, labelId) {
    const fitLabelId = labelId.substring(1, labelId.length)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const TaskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    let labelIds = board.groups[groupIdx].tasks[TaskIdx].labelIds
    if (!labelIds) return board.groups[groupIdx].tasks[TaskIdx].labelIds = [fitLabelId]
    labelIds.push(fitLabelId)
}

function onRemoveLabel(board, groupId, taskId, labelId) {
    const fitLabelId = labelId.substring(1, labelId.length)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const TaskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    let labelIds = board.groups[groupIdx].tasks[TaskIdx].labelIds
    const labelIdx = labelIds.findIndex(currLabelId => currLabelId === fitLabelId)
    labelIds.splice(labelIdx, 1)
}

function checkLabel(board, groupId, taskId, labelId) {
    const fitLabelId = labelId.substring(1, labelId.length)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const TaskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    let labelIds = board.groups[groupIdx].tasks[TaskIdx].labelIds
    if (!labelIds) return false
    const labelIdx = labelIds.findIndex(currLabelId => currLabelId === fitLabelId)
    if (labelIdx === -1) return false
    return true
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

function getTimeStemp(){
    const event = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return event.toLocaleDateString('en-US', options)
}

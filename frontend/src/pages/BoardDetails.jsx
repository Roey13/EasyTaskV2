import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Group } from '../cmps/Group.jsx';
import { SideBar } from '../cmps/SideBar.jsx';
import { setBoard, loadBoards, saveBoard } from '../store/actions/boardActions.js'
import { loadUsers } from '../store/actions/userActions.js'
import { groupService } from '../services/groupService.js'
import { taskService } from '../services/taskService.js';
import { TaskDetails } from '../pages/TaskDetails.jsx';
import { labelService } from '../services/labelService.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { boardService } from '../services/boardService.js';
import { BoardHeader } from '../cmps/BoardHeader'
import { socketService } from '../services/socketService.js';
import { BoardCharts } from '../cmps/BoardCharts'
import loading from '../assets/imgs/loading.gif'

class _BoardDetails extends React.Component {

    state = {
        isSideBarOpen: false,
        isAddGroupOpen: false,
        isDragDisabled: false,
        isChartsOpen: false,
        group: {
            title: ''
        }
    }

    componentDidMount() {
        const { boardId } = this.props.match.params;
        this.getBoardDetails()
        this.props.loadUsers()
        socketService.setup()
        socketService.emit('join board', boardId)
        socketService.on('updated board', (board) => {
            this.props.setBoard(board._id)
        })

    }

    handleChange = (ev) => {
        ev.preventDefault()
        const value = ev.target.value;
        const key = ev.target.name;
        this.setState({ group: { [key]: value } });
    }

    onToggleSideBar = () => {
        this.setState({ isChartsOpen: false })
        this.setState({ isSideBarOpen: !this.state.isSideBarOpen })

    }

    onToggleCharts = (order = null) => {
        if (order === 'close') return this.setState({ isChartsOpen: false })
        this.setState({ isChartsOpen: !this.state.isChartsOpen })
    }

    getBoardDetails = () => {
        const { boardId } = this.props.match.params;
        this.props.setBoard(boardId)
    }

    onDeleteGroup = (group) => {
        const board = this.props.currBoard
        groupService.deleteGroup(board, group.id)
        boardService.addActivity(this.props.loggedInUser, board, group, 'deleted the list:')
        this.props.saveBoard(board)
    }
    onCopyGroup = (group) => {
        const board = this.props.currBoard
        groupService.copyGroup(board, group)
        boardService.addActivity(this.props.loggedInUser, board, group, 'copied the list:')
        this.props.saveBoard(board)
    }
    changeGroupName = (newGroupTitle, group) => {
        const board = this.props.currBoard
        if (groupService.changeGroupName(newGroupTitle, group)) {
            boardService.addActivity(this.props.loggedInUser, board, group, `changed the list name to: "${newGroupTitle}" from:`)
            this.props.saveBoard(board)
        }
    }
    changeBoardTitle = (newBoardTitle) => {
        const board = this.props.currBoard
        if (board.title === newBoardTitle || newBoardTitle === "") return
        boardService.changeBoardTitle(board, newBoardTitle)
        boardService.addActivity(this.props.loggedInUser, board, null, `changed the board name to: "${newBoardTitle}"`)
        this.props.saveBoard(board)
    }

    onToggleAddGroup = () => {
        this.setState({ isAddGroupOpen: !this.state.isAddGroupOpen })
    }
    onAddGroup = (newGroupTitle) => {
        this.onToggleAddGroup()
        const board = this.props.currBoard
        const group = groupService.addGroup(board, newGroupTitle)
        boardService.addActivity(this.props.loggedInUser, board, group, 'Added a new list named:')
        this.props.saveBoard(board)
    }

    goBack = () => {
        this.props.history.push('/board')
    }

    onAddTask = (group, newTitle) => {
        const loggedInUser = this.props.loggedInUser
        const board = this.props.currBoard
        const task = taskService.addTask(board, group.id, newTitle, loggedInUser)
        boardService.addActivity(this.props.loggedInUser, board, group, 'Added a new card named:', task)
        this.props.saveBoard(board)
    }
    onUpdateTask = (group, updatedTask, task) => {
        const board = this.props.currBoard
        taskService.updateTask(board, group.id, updatedTask)
        boardService.addActivity(this.props.loggedInUser, board, group, `changed the card name to: "${updatedTask.title}" from:`, task)
        this.props.saveBoard(board)
    }

    onDeleteTask = (group, task) => {
        const board = this.props.currBoard
        taskService.deleteTask(board, group.id, task.id)
        boardService.addActivity(this.props.loggedInUser, board, group, 'deleted the card:', task)
        this.props.saveBoard(board)
    }

    onAddLabel = (groupId, taskId, labelId) => {
        const board = this.props.currBoard
        taskService.addLabel(board, groupId, taskId, labelId)
        this.props.saveBoard(board)
    }
    checkLabel = (groupId, taskId, labelId) => {
        const board = this.props.currBoard
        return taskService.checkLabel(board, groupId, taskId, labelId)
    }
    onRemoveLabel = (groupId, taskId, labelId) => {
        const board = this.props.currBoard
        taskService.onRemoveLabel(board, groupId, taskId, labelId)
        this.props.saveBoard(board)
    }

    updateLabel = (currLabel, labelUpdates) => {
        const board = this.props.currBoard
        labelService.updateLabel(board, currLabel, labelUpdates)
        this.props.saveBoard(board)
    }
    addLabelToBoard = (newLabel) => {
        const board = this.props.currBoard
        labelService.addLabelToBoard(board, newLabel)
        this.props.saveBoard(board)
    }
    getDatePreview = (dateNum) => {
        return taskService.getDatePreview(dateNum)
    }

    toggleTaskMember = (task, member) => {
        const board = this.props.currBoard;
        taskService.toggleTaskMember(task, member)
        this.props.saveBoard(board)
    }

    handleOnDragEnd = (result) => {
        const board = this.props.currBoard;
        if (!result.destination) return
        if (result.type === 'list') {
            const groups = board.groups
            const [reorderedItem] = groups.splice(result.source.index, 1);
            groups.splice(result.destination.index, 0, reorderedItem)
        } else {
            const groupSource = board.groups.find(group => group.id === result.source.droppableId)
            const [reorderedItem] = groupSource.tasks.splice(result.source.index, 1);
            const groupDes = board.groups.find(group => group.id === result.destination.droppableId)
            groupDes.tasks.splice(result.destination.index, 0, reorderedItem)
        }
        this.props.saveBoard(board)
    }

    onChangeBg = (pick, imgUrl, bgColor) => {
        const board = this.props.currBoard;
        boardService.changeBg(pick, imgUrl, bgColor, board)
        this.props.saveBoard(board)
    }

    toggleDroppable = () => {
        this.setState({ ...this.state, isDragDisabled: !this.state.isDragDisabled });
    }

    setDate = (date, task) => {
        const board = this.props.currBoard;
        taskService.setTaskDate(task, date);
        this.props.saveBoard(board)
    }

    toggleUser = (user) => {
        const board = this.props.currBoard;
        boardService.toggleUser(board, user)
        this.props.saveBoard(board)
    }


    render() {
        const { isAddGroupOpen, isSideBarOpen, isDragDisabled, isChartsOpen } = this.state
        const { users } = this.props
        const newGroupTitle = this.state.group.title
        const board = this.props.currBoard
        if (!board) return (
        <div className="loading">
            <img className='loading-img' src={loading} />
        </div>
        )
        return  <div className="group-container">
            <div className='task-details-container'>
                <Route component={TaskDetails} path='/board/:boardId/:groupId/:taskId' />
                <div className='board-window' style={(board.style.imgUrl) ? { backgroundImage: `url(${board.style.imgUrl})` } : { backgroundColor: board.style.bgColor }} ></div>
            </div>

            <div className="board-header-container">
                <BoardHeader toggleUser={this.toggleUser} users={users} changeBoardTitle={this.changeBoardTitle} board={board} onToggleSideBar={this.onToggleSideBar} onToggleCharts={this.onToggleCharts} />
            </div>

            {isSideBarOpen &&
                < SideBar onChangeBg={this.onChangeBg} getDatePreview={this.getDatePreview} board={board} onToggleSideBar={this.onToggleSideBar} />
            }

            {isChartsOpen &&
                <BoardCharts board={board} onToggleCharts={this.onToggleCharts}/>
            }



            <DragDropContext onDragEnd={this.handleOnDragEnd}>
                <Droppable droppableId={board._id} direction="horizontal" type='list' >
                    {(provided) => (
                        <div className="board-container"{...provided.droppableProps} ref={provided.innerRef}>
                            {(board.groups) && board.groups.map((group, index) => {
                                return (
                                    <Draggable isDragDisabled={isDragDisabled} key={group.id} draggableId={group.id} index={index}>
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}>
                                                <Group setDate={this.setDate} toggleDroppable={this.toggleDroppable} isDragDisabled={isDragDisabled} changeGroupName={this.changeGroupName} toggleTaskMember={this.toggleTaskMember} updateLabel={this.updateLabel} addLabelToBoard={this.addLabelToBoard} checkLabel={this.checkLabel} onRemoveLabel={this.onRemoveLabel} onAddLabel={this.onAddLabel} onDeleteTask={this.onDeleteTask} onUpdateTask={this.onUpdateTask} onCopyGroup={this.onCopyGroup} onDeleteGroup={this.onDeleteGroup} board={board} group={group} onAddTask={this.onAddTask} />
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })
                            }
                            {!isAddGroupOpen &&
                                <button className='add-group-toggle-btn' onClick={this.onToggleAddGroup}>+ Add another list</button>}
                            {isAddGroupOpen &&
                                <form className='add-group-form' onSubmit={this.handleChange}>
                                    <textarea name='title' placeholder='Enter list title...' className='group-title-input' id="" cols="1" rows="1" onChange={this.handleChange}></textarea>
                                    <div className='add-group-controls'>
                                        <button className='add-group-add-btn' onClick={() => this.onAddGroup(newGroupTitle)}> Add list</button>
                                        <button className='add-group-close-btn' onClick={this.onToggleAddGroup}> X </button>
                                    </div>
                                </form>
                            }

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userModule.loggedInUser,
        currBoard: state.boardModule.currBoard,
        boards: state.boardModule.boards,
        users: state.userModule.users,
    }
}
const mapDispatchToProps = {
    loadUsers,
    setBoard,
    loadBoards,
    saveBoard
}

export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails)
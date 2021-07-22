import React from 'react'
import { TaskList } from './TaskList.jsx'
import { GroupOptions } from './GroupOptions.jsx'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


export class Group extends React.Component {
    state = {
        isGroupOptionOpen: false,
        isAddTaskOpen: false,
        isChangeGroupNameOpen: false,
        isScroll: false,
        group: {
            title: ''
        },
        task: {
            title: ''
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    handleClick = (ev) => {
        if (this.node.contains(ev.target)) {
            return;
        }

        this.handleClickOutside()
    }

    handleClickOutside = () => {
        this.onChangeGroupName(this.state.group.title)
        this.setState({ isChangeGroupNameOpen: false, isAddTaskOpen: false })
    }

    handleTaskChange = (ev) => {
        const value = ev.target.value;
        const key = ev.target.name;
        this.setState({ task: { [key]: value } });
    }
    handleGroupChange = (ev) => {
        const value = ev.target.value;
        const key = ev.target.name;
        this.setState({ group: { [key]: value } });
    }

    onToggleAddTask = () => {
        this.props.toggleDroppable()
        this.setState({ isScroll: !this.state.isScroll})
        this.setState({ isGroupOptionOpen: false })
        this.setState({ isAddTaskOpen: !this.state.isAddTaskOpen })
    }

    onToggleGroupOptions = () => {
        this.props.toggleDroppable()
        this.setState({ isAddTaskOpen: false })
        this.setState({ isGroupOptionOpen: !this.state.isGroupOptionOpen })
    }

    onDeleteGroup = () => {
        this.onToggleGroupOptions()
        this.props.onDeleteGroup(this.props.group)

    }
    onCopyGroup = () => {
        this.onToggleGroupOptions()
        this.props.onCopyGroup(this.props.group)

    }
    onUpdateTask = (updatedTask, task) => {
        this.props.onUpdateTask(this.props.group, updatedTask, task)

    }
    toggleChangeGroupName = () => {
        this.setState({ isChangeGroupNameOpen: !this.state.isChangeGroupNameOpen })
    }
    onDeleteTask = (task) => {
        this.props.onDeleteTask(this.props.group, task)

    }

    onAddLabel = (taskId, labelId) => {
        this.props.onAddLabel(this.props.group.id, taskId, labelId)
    }
    checkLabel = (taskId, labelId) => {
        return this.props.checkLabel(this.props.group.id, taskId, labelId)
    }
    onRemoveLabel = (taskId, labelId) => {
        this.props.onRemoveLabel(this.props.group.id, taskId, labelId)
    }

    onChangeGroupName = (newGroupTitle) => {
        this.toggleChangeGroupName()
        this.props.changeGroupName(newGroupTitle, this.props.group)
    }
    render() {

        const { group, board, onAddTask, updateLabel, addLabelToBoard, toggleTaskMember } = this.props
        const newTaskTitle = this.state.task.title
        const newGroupTitle = this.state.group.title
        const { isAddTaskOpen, isGroupOptionOpen, isChangeGroupNameOpen,isScroll } = this.state

        return (
            <div ref={node => { this.node = node }} className="group-container">
                <div className="group">
                    <div className='header'>
                        {!isChangeGroupNameOpen &&
                            <div className='title' onClick={this.toggleChangeGroupName}>{group.title}</div>}
                        {isChangeGroupNameOpen &&
                            <form onSubmit={() => this.onChangeGroupName(newGroupTitle)}>
                                <input autoComplete='off' onChange={this.handleGroupChange} type="text" name='title' defaultValue={group.title} />
                            </form>}

                        <button className='options' onClick={this.onToggleGroupOptions}>{<MoreHorizIcon className='group-options-svg' />}</button>
                    </div>

                    <TaskList isScroll={isScroll} isAddTaskOpen={isAddTaskOpen} onToggleAddTask={this.onToggleAddTask} handleTaskChange={this.handleTaskChange} onAddTask={onAddTask} group={group} newTaskTitle={newTaskTitle} setDate={this.props.setDate} isDragDisabled={this.props.isDragDisabled} toggleDroppable={this.props.toggleDroppable} toggleTaskMember={toggleTaskMember} updateLabel={updateLabel} addLabelToBoard={addLabelToBoard} checkLabel={this.checkLabel} onRemoveLabel={this.onRemoveLabel} board={board} onAddLabel={this.onAddLabel} onDeleteTask={this.onDeleteTask} onUpdateTask={this.onUpdateTask} tasks={group.tasks} group={group} />
                    {!isAddTaskOpen &&
                        <button className='add-task-toggle-btn' onClick={this.onToggleAddTask}>+ Add another card</button>}
                    {isGroupOptionOpen &&
                        <GroupOptions onToggleGroupOptions={this.onToggleGroupOptions} onCopyGroup={this.onCopyGroup} onDeleteGroup={this.onDeleteGroup} group={group} onToggleAddTask={this.onToggleAddTask} />}
                </div>
            </div>
        )
    }

}
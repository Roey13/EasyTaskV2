import { Component } from 'react';
import { LabelsList } from './LabelsList.jsx'
import { MembersList } from './MembersList.jsx'
import React from 'react'
import { Dates } from './Dates';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

export class TaskOptions extends Component {
    state = {
        isEditLabelsOpen: false,
        isEditMembersOpen: false,
        isEditDueDateOpen: false,
        task: {
            title: ''
        }
    }

    onUpdateTask = (task) => {
        this.props.onToggleTaskOptions()
        const updatedTask = { ...task, title: this.state.task.title }
        this.props.onUpdateTask(updatedTask, task)
    }
    handleChange = (ev) => {
        const value = ev.target.value;
        const key = ev.target.name;
        this.setState({ task: { [key]: value } });
    }

    toggleEditLabels = () => {
        this.setState({ isEditLabelsOpen: !this.state.isEditLabelsOpen })
    }
    toggleEditMembers = () => {
        this.setState({ isEditMembersOpen: !this.state.isEditMembersOpen })
    }
    toggleChangeDueDate = () => {
        this.setState({ isEditDueDateOpen: !this.state.isEditDueDateOpen })
    }

    preventDragHandler = (e) => {
        e.preventDefault();
    }



    render() {
        const { isEditLabelsOpen, isEditMembersOpen, isEditDueDateOpen } = this.state
        const { checkLabel, updateLabel, addLabelToBoard, onRemoveLabel, onDeleteTask, onToggleTaskOptions, task, board, onAddLabel, toggleTaskMember } = this.props
        return (
            <React.Fragment>
                <div onClick={onToggleTaskOptions} className='task-options-window' ></div>
                <div className='task-options-container'>
                    {isEditDueDateOpen &&
                        <Dates toggleChangeDueDate={this.toggleChangeDueDate} task={task} setDate={this.props.setDate}></Dates>
                    }
                    <div className='change-task-title'>
                        <textarea cols='1' rows='8' type="text" className='new-title-input' placeholder={task.title} name='title' onChange={this.handleChange}></textarea>
                        <button onClick={() => this.onUpdateTask(task)}>Save</button>
                    </div>
                    <div className='options-btns'>
                        <button className='options-btn' onClick={this.toggleEditLabels} ><LabelOutlinedIcon className='svg change-task-labels' />Edit Labels</button>
                        {isEditLabelsOpen &&
                            <LabelsList updateLabel={updateLabel} addLabelToBoard={addLabelToBoard} checkLabel={checkLabel} onRemoveLabel={onRemoveLabel} task={task} onAddLabel={onAddLabel} toggleEditLabels={this.toggleEditLabels} board={board} />
                        }
                        <button className='options-btn' onClick={this.toggleEditMembers} ><PersonOutlineOutlinedIcon className='svg change-task-members' />Change Members</button>
                        {isEditMembersOpen &&
                            <MembersList toggleTaskMember={toggleTaskMember} board={board} task={task} toggleEditMembers={this.toggleEditMembers} />
                        }
                        <button className='options-btn' onClick={this.toggleChangeDueDate} ><TodayOutlinedIcon className='svg edit-task-due-date' />Change Due Date</button>
                        <button className='options-btn' onClick={() => onDeleteTask(task)}><DeleteOutlineIcon className='svg delete-task' /> Delete</button>
                    </div>

                </div>
            </React.Fragment >
        )

    }
}


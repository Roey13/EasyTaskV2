import { Component } from 'react';
import { taskService } from '../services/taskService.js'
import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'
import { LabelPreview } from './LabelPreview.jsx'
import { TaskOptions } from './TaskOptions.jsx';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

export class TaskPreview extends Component {

    state = {
        isTaskOptionsShow: false,
        isLabelsOpen: false
    }

    getLableById = (labelId) => {
        return this.props.board.labels.find(label => label.id === 'l' + labelId)
    }

    toggleTaskOptions = () => {
        this.props.toggleDroppable()
        this.setState({ isTaskOptionsShow: !this.state.isTaskOptionsShow })
    }

    toggleLabels = () => {
        this.setState({ isLabelsOpen: !this.state.isLabelsOpen })
    }

    convertNumToDate = (deuDate) => {
        if (!deuDate) return
        const date = deuDate.date || deuDate;
        const deuDatePreview = taskService.getDatePreview(date)
        return deuDatePreview
    }
    getChecklistsPreview = (checklists) => {
        const preview = taskService.getPreview(checklists)
        return (preview)
    }

    setDate = (date) => {
        this.props.setDate(date, this.props.task)
    }

    render() {
        const { toggleTaskMember, checkLabel, updateLabel, addLabelToBoard, onRemoveLabel, board, group, task, onUpdateTask, onDeleteTask, onAddLabel } = this.props
        const { isTaskOptionsShow, isLabelsOpen } = this.state
        return (
            <article className={`task-container`}>
                {isTaskOptionsShow &&
                    <TaskOptions setDate={this.setDate} toggleTaskMember={toggleTaskMember} updateLabel={updateLabel} addLabelToBoard={addLabelToBoard} checkLabel={checkLabel} onRemoveLabel={onRemoveLabel} onAddLabel={onAddLabel} board={board} onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask} task={task} onToggleTaskOptions={this.toggleTaskOptions} />}
                {(task.style) ? (task.style.bgColor || task.style.imgUrl) ? <div className='task-cover'>
                    {(task.style) ? (task.style.imgUrl) ? <img className='img-cover' src={task.style.imgUrl} alt="" /> : <div className='bgc-cover' style={{ backgroundColor: task.style.bgColor }}></div> : ''}
                </div> : '' : ''}
                {(task.labelIds) ? <div className='label-list' onClick={this.toggleLabels}>
                    {(task.labelIds) ? task.labelIds.map(labelId => {
                        const label = this.getLableById(labelId)
                        return <LabelPreview isLabelsOpen={isLabelsOpen} key={label.id} lable={label} />
                    }) : ''}
                </div> : ''}
                <Link to={`/board/${board._id}/${group.id}/${task.id}`} className="link"><h5>{task.title}</h5>
                    {(task.dueDate || task.checklists || task.members) ? <div className='badges'>
                        {(task.dueDate) &&
                            <div className='dew-date flex' style={{ backgroundColor: (!task.dueDate.complete) ? '#eb5a46' : '#60be50' }}>
                                <AccessTimeOutlinedIcon className="clock"></AccessTimeOutlinedIcon>
                                {this.convertNumToDate(task.dueDate)}
                            </div>}

                        {(task.checklists && task.checklists.legnth !== 0) ? <div className='checklists-preview'>
                            <CheckBoxOutlinedIcon /> {this.getChecklistsPreview(task.checklists)}
                        </div> : ''}
                        <div className='avatars'>
                            {(task.members) ? task.members.map(member => {
                                return <Avatar key={member._id} className='avatar' alt={member.fullName} src={member.imgUrl} />
                            }) : ''}
                        </div>
                    </div> : ''}
                </Link>
                <button onClick={this.toggleTaskOptions} className='task-options'><MoreHorizIcon className='task-options-svg' /></button>

            </article>
        )

    }
}


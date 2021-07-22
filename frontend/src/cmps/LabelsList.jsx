import { Component } from 'react';
import { LabelEdit } from './LabelEdit.jsx'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import React from 'react'

export class LabelsList extends Component {

    state = {
        isEditLabelOpen: false,
        currLabel: null
    }
    onLabelToggle = (taskId, labelId) => {
        if (this.props.checkLabel(taskId, labelId)) {
            return this.props.onRemoveLabel(taskId, labelId)
        }
        this.props.onAddLabel(taskId, labelId)
    }

    toggleEditLabel = (label = null) => {
        this.setState({ isEditLabelOpen: !this.state.isEditLabelOpen })
        this.setState({ currLabel: label })
    }
    checkIfLabelInTask = (currLabelId) => {
        const fitLabelId = currLabelId.substring(1)
        return this.props.task.labelIds?.some(labelId => labelId === fitLabelId)
    }


    render() {
        const { isEditLabelOpen } = this.state
        const { task, board, toggleEditLabels } = this.props
        return (<React.Fragment>

            {!isEditLabelOpen &&
                <div className='edit-labels-container'>
                    <div className='edit-labels-header'>
                        <div className='title'>List Actions</div>
                        <button className='close-edit-labels-btn' onClick={toggleEditLabels}>X</button>
                    </div>
                    {(board.labels) ?
                        <div className='labels'>
                            {board.labels.map(label => {
                                return <div key={label.id} className='label-preview'>
                                    <div style={{ backgroundColor: label.color }} className='label-title' onClick={() => this.onLabelToggle(task.id, label.id)}>{label.title}
                                        {this.checkIfLabelInTask(label.id) && <DoneOutlinedIcon />}</div>

                                    <button className='open-edit-label-btn' onClick={() => this.toggleEditLabel(label)}><EditOutlinedIcon /></button>
                                </div>

                            })}
                        </div> : ''}
                    <button className='create-label-btn' onClick={() => this.toggleEditLabel()}>+Create New Label</button>
                </div>}
            {isEditLabelOpen &&
                <LabelEdit updateLabel={this.props.updateLabel} addLabelToBoard={this.props.addLabelToBoard} toggleEditLabel={this.toggleEditLabel} currLabel={this.state.currLabel} />
            }
        </React.Fragment>
        )

    }
}


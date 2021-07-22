import React from 'react'
import { connect } from 'react-redux'
import { TextField } from '@material-ui/core';
import { utilService } from '../services/utilService';

class _Dates extends React.Component {

    state = {
        date: null
    }

    closeDateModal = () => {
        if (this.props.prevPage === 'task-details') return this.props.toggleModal('isEditDateShow')
        this.props.toggleChangeDueDate()

    }
    onChange = ({ target }) => {
        const { value } = target
        this.props.setDate(value)
        if (this.props.prevPage === 'task-details') return this.props.toggleModal('isEditDateShow')
        this.props.toggleChangeDueDate()
    }

    render() {
        const { task } = this.props
        return <form className='dates-form flex' noValidate>
            <TextField className="dates"
                id="datetime-local"
                label="Due date"
                type="datetime-local"
                defaultValue={task.dueDate || utilService.convertToCreatedAtDate(new Date())}
                onChange={this.onChange}
                autoFocus={true}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <button onClick={this.closeDateModal} className='cancel-change-date-btn'>cancel</button>
        </form>
    }
}

function mapStateToProps(state) {
    return {
        currBoard: state.boardModule.currBoard,
    }
}

export const Dates = connect(mapStateToProps)(_Dates)
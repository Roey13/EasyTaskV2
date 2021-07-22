import { Component, React } from 'react';
import { Avatar } from '@material-ui/core';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import { utilService } from '../services/utilService';



export class MembersList extends Component {

    state = {
        isEditLabelOpen: false,
        currLabel: null
    }

    checkIfMemberInTask = (name) => {
        var patten = new RegExp(name);
        return this.props.task.members?.some(member => {
            return patten.test(member.fullname)
        })
    }

    render() {
        const { board, task, toggleEditMembers, toggleTaskMember } = this.props
        return (
            <div className="edit-members-container">
                <div className='edit-members-header'>
                    <h1 className='title' >Members</h1>
                    <button className='close-edit-members-btn' onClick={toggleEditMembers}>x</button>
                </div>
                {board.members && board.members.map(member => {
                    return <div className="member-preview" key={member._id} onClick={() => toggleTaskMember(task, member)}>
                        <Avatar className="avatar" key={member._id} src={member.imgUrl}>{utilService.getNameInitials(member.fullname)}</Avatar>
                        <h4 className='member-name'>{member.fullname}</h4>
                        {this.checkIfMemberInTask(member.fullname) && <DoneOutlinedIcon />}
                    </div>
                })}
            </div>
        )

    }
}


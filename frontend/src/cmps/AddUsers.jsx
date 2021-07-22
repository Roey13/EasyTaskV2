import { Component, React } from 'react';
import { Avatar } from '@material-ui/core';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import { utilService } from '../services/utilService';



export class AddUsers extends Component {

    state = {
        isEditLabelOpen: false,
        currLabel: null
    }

    checkIfMemberInBoard = (name) => {
        var patten = new RegExp(name);
        return this.props.board.members?.some(member => {
            return patten.test(member.fullname)
        })
    }


    render() {
        const {  users, toggleAddMembers,toggleUser, board } = this.props
        return (
            <div className="edit-users-container">
                <div className='edit-users-header'>
                    <h1 className='title' >Invite to board</h1>
                    <button className='close-edit-users-btn' onClick={toggleAddMembers}>x</button>
                </div>
                {users && users.map(user => {
                    return <div onClick={() => toggleUser(user)} className="users-preview" key={user._id} >
                        <Avatar className="avatar" key={user._id} src={user.imgUrl}>{utilService.getNameInitials(user.fullname)}</Avatar>
                        <h4 className='users-name'>{user.fullname}</h4>
                        {this.checkIfMemberInBoard(user.fullname) && <DoneOutlinedIcon />}
                    </div>
                })}
            </div>
        )

    }
}


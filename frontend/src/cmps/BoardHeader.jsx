import React from 'react';
import { Avatar } from '@material-ui/core';
import { utilService } from '../services/utilService.js'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { AddUsers } from './AddUsers';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

export class BoardHeader extends React.Component {
    state = {
        isChangeBoardTitleOpen: false,
        isAddMembersOpen: false,
        isMenuShow: false,
        board: {
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

        if (this.state.isChangeBoardTitleOpen) this.handleClickOutside()
    }

    handleClickOutside = () => {
        this.onChangeBoardTitle(this.state.board.title)
        this.setState({ isChangeBoardTitleOpen: false, isAddMembersOpen: false })
    }

    toggleChangeBoardTitle = () => {
        this.props.onToggleCharts('close')
        this.setState({ isChangeBoardTitleOpen: !this.state.isChangeBoardTitleOpen })
    }
    toggleAddMembers = () => {
        this.props.onToggleCharts('close')
        this.setState({ isAddMembersOpen: !this.state.isAddMembersOpen })
    }

    handleChange = (ev) => {
        ev.preventDefault()
        const value = ev.target.value;
        const key = ev.target.name;
        this.setState({ ...this.state, board: { [key]: value } });
    }

    onChangeBoardTitle = (newBoardTitle) => {
        this.toggleChangeBoardTitle()
        this.props.changeBoardTitle(newBoardTitle)
    }

    toggleModal = () => {
        const { isMenuShow } = this.state
        this.setState({ isMenuShow: !isMenuShow })
    }

    render() {
        const { board, onToggleSideBar, users, toggleUser, onToggleCharts } = this.props
        const { members } = board
        const { isChangeBoardTitleOpen, isAddMembersOpen, isMenuShow } = this.state
        const newBoardTitle = this.state.board.title
        return (
            <div className="board-header" ref={node => { this.node = node }}>
                <div className="header-options">
                    <MenuOutlinedIcon className="menu-icon" onClick={this.toggleModal} />
                    {isMenuShow &&
                        <div className='board-menu-modal'>
                            <div className="header-stats-mobile" onClick={onToggleCharts}> <EqualizerIcon /> Statistics </div>
                            <div className="header-avatars-mobile">
                                {members.map(member =>
                                    <Avatar className="header-avatar-mobile" key={member._id} src={member.imgUrl}>
                                        {utilService.getNameInitials(member.fullname)}
                                    </Avatar>)}
                                <Avatar onClick={this.toggleAddMembers} className="header-avatar add-member-avatar" >
                                    <PersonAddIcon />
                                </Avatar>
                            </div>
                            <button onClick={onToggleSideBar} className='open-side-bar-btn-mobile'>Show menu</button>
                        </div>
                    }
                    {!isChangeBoardTitleOpen &&
                        <div className='header-title' onClick={this.toggleChangeBoardTitle}>{board.title}</div>}
                    {isChangeBoardTitleOpen &&
                        <form onSubmit={() => this.onChangeBoardTitle(newBoardTitle)}>
                            <input autoComplete='off' className='board-title-input' onChange={this.handleChange} type="text" name='title' defaultValue={board.title} onClick={this.handleClick} />
                        </form>}
                    <div className="header-stats" onClick={onToggleCharts}> <EqualizerIcon /> Statistics </div>
                    <div className="header-avatars">
                        {members.map(member =>
                            <Avatar className="header-avatar" key={member._id} src={member.imgUrl}>
                                {utilService.getNameInitials(member.fullname)}
                            </Avatar>)}
                        <Avatar onClick={this.toggleAddMembers} className="header-avatar add-member-avatar" >
                            <PersonAddIcon />
                        </Avatar>
                    </div>

                    {isAddMembersOpen &&
                        <AddUsers toggleUser={toggleUser} board={board} toggleAddMembers={this.toggleAddMembers} users={users} />}
                    <button onClick={onToggleSideBar} className='open-side-bar-btn'>{<MoreHorizIcon />}Show menu</button>
                </div>
            </div >
        )
    }
}
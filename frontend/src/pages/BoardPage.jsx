import React from 'react';
import { connect } from 'react-redux'
import { loadBoards, saveBoard } from '../store/actions/boardActions.js'
import { loadUsers } from '../store/actions/userActions.js'
import { BoardList } from '../cmps/BoardList'
import loading from '../assets/imgs/loading.gif'

class _BoardPage extends React.Component {

    state = {
        isCreateHidden: true,
        board: {
            "title": '',
            "bgColor": '#000'
        }
    }

    componentDidMount() {
        this.props.loadBoards()
        this.props.loadUsers()
    }

    toggleModalVisibility = (boolean) => {
        this.setState({isCreateHidden : boolean})
    }

    handleChange = (ev) => {
        this.setState({ board: { ...this.state.board, [ev.target.name]: ev.target.value } })
    }

    onCreateBoard = (ev) => {
        ev.preventDefault()
        this.props.saveBoard(this.state.board)
        this.setState({ isCreateHidden: true })
    }

    render() {
        const { boards } = this.props
        const { users } = this.props
        if (!boards) return (
            <div className="loading">
                <img className='loading-img' src={loading} />
            </div>
            )
        return (
            <section className="board-page">
                <h1>Your Boards</h1>
                <BoardList boards={boards}/>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        users: state.userModule.users
    }
}
const mapDispatchToProps = {
    loadBoards,
    saveBoard,
    loadUsers
}


export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage)
import React from 'react';
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions.js'
import Plus from '../assets/imgs/plus.png'

class _BoardCreate extends React.Component {

    state = {
        isCreateHidden: true,
        board: {
            title: '',
            style: {
                imgUrl: '',
                bgColor: ''
            }
        }
    }

    toggleModalVisibility = (boolean) => {
        this.setState({ isCreateHidden: boolean })
    }

    handleChange = (ev) => {
        this.setState({ board: { ...this.state.board, [ev.target.name]: ev.target.value } })
    }

    handleBackground = (ev) =>{
        const style = {imgUrl: ev.target.src, bgColor: ev.target.style.backgroundColor}
        this.setState({ board: { ...this.state.board, style}})
    }

    onCreateBoard = (ev) => {

        ev.preventDefault()
        if (!this.state.board.title) return
        this.props.saveBoard(this.state.board)
        this.setState({isCreateHidden: true, board: { title: '', style: {imgUrl: '', bgColor: ''}}})
    }

    render() {

        const { isCreateHidden } = this.state

        return (
            <div>
                <div className="board-create" onClick={() => { this.toggleModalVisibility(false) }}>
                    <img className="plus-icon" alt = "" src={Plus} />
                </div>
                {!isCreateHidden && 
                <form className="create-board" hidden={this.state.isCreateHidden} onSubmit={this.onCreateBoard} autoComplete="off">
                <h1 className="create-board-title">Create New Board</h1>
                    <input autoComplete='off' type="text" name="title" placeholder="Enter Board Name..." onChange={this.handleChange} value={this.state.board.title}></input>
                    <div className="board-background-options">
                        <div className="board-background-thumb" onClick={this.handleBackground} style={{backgroundColor: '#60be50'}}></div>
                        <div className="board-background-thumb" onClick={this.handleBackground}><img   src="https://bit.ly/3yLM7uN" alt=""/></div>
                        <div className="board-background-thumb" onClick={this.handleBackground} style={{backgroundColor: '#0279bf'}}></div>
                        <div className="board-background-thumb" onClick={this.handleBackground}><img src="https://bit.ly/3uVKA2j" alt=""/></div>
                        <div className="board-background-thumb" onClick={this.handleBackground} style={{backgroundColor: '#ff9f1a'}}></div>
                        <div className="board-background-thumb" onClick={this.handleBackground}><img src="https://bit.ly/3i3i4c9" alt=""/></div>
                        <div className="board-background-thumb" onClick={this.handleBackground} style={{backgroundColor: '#eb5a46'}}></div>
                        <div className="board-background-thumb" onClick={this.handleBackground}><img src="https://bit.ly/3c574Hw" alt=""/></div>
                        <div className="board-background-thumb" onClick={this.handleBackground}><img src="https://bit.ly/3p5Xiuc" alt=""/></div>
                    </div>
                    <button>Create</button>
                    <button onClick={() => { this.toggleModalVisibility(true) }}>Cancel</button>
                </form>
    }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    saveBoard
}


export const BoardCreate = connect(mapStateToProps, mapDispatchToProps)(_BoardCreate)
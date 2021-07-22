import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { Checkbox } from '@material-ui/core';
import { Component } from 'react';
import { utilService } from '../services/utilService'
import React from 'react'
import loading from '../assets/imgs/loading.gif'

export class Checklist extends Component {

    state = {
        checklists: null
    }

    componentDidMount() {
        const { checklists } = this.props
        this.setState({ checklists })
    }

    toggleComplete = (checklistIdx, todoIdx) => {
        const { checklists } = this.state;
        checklists[checklistIdx].todos[todoIdx].isDone = !checklists[checklistIdx].todos[todoIdx].isDone
        this.setState({ ...this.state, checklists }, () => {
            this.props.updateChecklist(this.state.checklists)
        })
    }

    handleChange = (ev, checklistIdx, todoIdx) => {
        let { name, value } = ev.target;
        const { checklists } = this.state;
        checklists[checklistIdx].todos[todoIdx][name] = value;
        this.setState({ ...this.state, checklists }, () => {
            this.props.updateChecklist(this.state.checklists)
        })
    }

    addTodo = (checklistIdx) => {
        const { checklists } = this.state;
        checklists[checklistIdx].todos.push({ id: utilService.makeId(), title: '', isDone: false })
        this.setState({ ...this.state, checklists }, () => {
            this.props.updateChecklist(this.state.checklists)
        })
    }

    removeTodo = (checklistIdx) => {
        const { checklists } = this.state;
        checklists.splice(checklistIdx, 1);
        this.setState({ ...this.state, checklists }, () => {
            this.props.updateChecklist(this.state.checklists)
        })
    }

    render() {
        const { checklists } = this.state
        if (!checklists) return (
            <div className="loading">
                <img className='loading-img' src={loading} />
            </div>
            )
        return <div className='checklists'>
            <div className="checklist flex column">
                {checklists.map((checklist, checklistIdx) => {
                    return <div className='todos flex column' key={checklist}>
                        <div className="flex container">
                            <div className="flex title">
                                <CheckBoxOutlinedIcon className="icon" color="disabled" />
                                <h3 className="title">{checklist.title || 'Checklists'}</h3>
                            </div>
                            <button onClick={() => this.removeTodo(checklistIdx)}>Delete</button>
                        </div>
                        {checklist.todos.map((todo, todoIdx) => {
                            return <div className='todo flex' key={checklist}>
                                <Checkbox className="checkbox"
                                    onChange={() => this.toggleComplete(checklistIdx, todoIdx)}
                                    checked={todo.isDone}
                                    cols="30"
                                    rows="5"
                                    wrap="off"
                                    color="uncontrolled" />
                                <input  className="title-input" placeholder='Add an item' defaultValue={todo.title}
                                    style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}
                                    onChange={(ev) => this.handleChange(ev, checklistIdx, todoIdx)}
                                    name="title"
                                />
                            </div>
                        })
                        }
                        <button onClick={() => this.addTodo(checklistIdx)}>Add an item</button>
                    </div>
                })
                }

            </div>
        </div>
    }
}
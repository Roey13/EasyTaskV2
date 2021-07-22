import { Component } from 'react';

import React from 'react'

export class GroupOptions extends Component {


    render() {
        const { onToggleGroupOptions, onToggleAddTask, onDeleteGroup, onCopyGroup } = this.props
        return (
            <React.Fragment>

                <div onClick={onToggleGroupOptions} className='group-options-window'></div>
                <div className='group-options-container'>
                    <div className='group-options-header'>
                        <div className='title'>List Actions</div>
                        <button className='close-group-options-btn' onClick={onToggleGroupOptions}>X</button>
                    </div>
                    <button onClick={onToggleAddTask}>Add Card...</button>
                    <button onClick={onCopyGroup}>Copy List...</button>
                    <button onClick={onDeleteGroup}>Delete List...</button>
                </div>
            </React.Fragment>
        )

    }
}


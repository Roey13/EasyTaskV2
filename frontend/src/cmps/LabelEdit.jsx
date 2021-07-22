import { Component } from 'react';

import React from 'react'

export class LabelEdit extends Component {

    state = {
        currLabel: null,
        label: {
            title: '',
            color: ''
        }
    }
    componentDidMount() {
        this.setState({ currLabel: this.props.currLabel })
    }
    onSaveLabel = (ev) => {
        ev.preventDefault()
        const currLabel = this.state.currLabel
        if (currLabel) {
            this.props.toggleEditLabel()
            return this.props.updateLabel(currLabel, this.state.label)

        }
        this.props.toggleEditLabel()
        this.props.addLabelToBoard(this.state.label)
    }
    handleChange = (ev) => {
        ev.preventDefault()
        const value = ev.target.value;
        const key = ev.target.name;
        this.setState({ label: { [key]: value } });
    }
    setLabelColor = (color) => {
        this.setState({ label: { ...this.state.label, color } })
    }
    render() {
        const { currLabel } = this.state
        const { toggleEditLabel } = this.props
        return (
            <div className='edit-label-container'>
                <div className='edit-label-header'>
                    <div className='title'>{(currLabel) ? 'Edit Label' : 'Create Label'}</div>
                    <button className='close-edit-label-btn' onClick={toggleEditLabel}>X</button>
                </div>
                <form className='edit-label-form'>
                    <label >Name</label>
                    <input autoComplete='off' type="text" name='title' onChange={this.handleChange} placeholder={(currLabel) ? currLabel.title : 'Add label title...'} />
                    <label >Select a color</label>
                    <div className='edit-label-colors-pick'>
                        <div onClick={() => this.setLabelColor('#f1d600')} style={{ backgroundColor: '#f1d600' }} className='color #f1d600'></div>
                        <div onClick={() => this.setLabelColor('#ff9f1a')} style={{ backgroundColor: '#ff9f1a' }} className='color #ff9f1a'></div>
                        <div onClick={() => this.setLabelColor('#eb5a46')} style={{ backgroundColor: '#eb5a46' }} className='color #eb5a46'></div>
                        <div onClick={() => this.setLabelColor('#c377e0')} style={{ backgroundColor: '#c377e0' }} className='color #c377e0'></div>
                        <div onClick={() => this.setLabelColor('#0279bf')} style={{ backgroundColor: '#0279bf' }} className='color #0279bf'></div>
                        <div onClick={() => this.setLabelColor('#00c2e0')} style={{ backgroundColor: '#00c2e0' }} className='color #00c2e0'></div>
                        <div onClick={() => this.setLabelColor('#60be50')} style={{ backgroundColor: '#60be50' }} className='color #60be50'></div>
                        <div onClick={() => this.setLabelColor('#50e898')} style={{ backgroundColor: '#50e898' }} className='color #50e898'></div>
                        <div onClick={() => this.setLabelColor('#fe78cb')} style={{ backgroundColor: '#fe78cb' }} className='color #fe78cb'></div>
                        <div onClick={() => this.setLabelColor('#344563')} style={{ backgroundColor: '#344563' }} className='color #344563'></div>
                        <div onClick={() => this.setLabelColor('#b3bac5')} style={{ backgroundColor: '#b3bac5' }} className='color #b3bac5'></div>
                    </div>
                    <div className='edit-label-controls'>
                        <button onClick={this.onSaveLabel} className='confirm-btn'>{(currLabel) ? 'Update' : 'Create'}</button>
                        {(currLabel)&&
                            <button className='delete-btn'>Delete</button>
                        }

                    </div>
                </form>
            </div>
        )
    }



}


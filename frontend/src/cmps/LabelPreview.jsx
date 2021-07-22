import React from 'react'

export function LabelPreview({ lable, isLabelsOpen, from }) {

    return (
        <div className={`label ${isLabelsOpen ? 'open' : ''}`} style={{ backgroundColor: lable.color }}>
            {isLabelsOpen || from === 'details' ? lable.title : ''}
        </div>
    )

}


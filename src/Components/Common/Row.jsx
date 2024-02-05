import React from 'react'

const Row = ({ label, value }) => {
    return (
        <div className='row'>
            <span className='row-label'>{label}</span>
            <span className='row-value'>{value}</span>
        </div>
    )
}

export default Row
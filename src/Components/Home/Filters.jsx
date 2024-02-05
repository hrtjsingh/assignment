import React from 'react'


const Filters = ({ label, filters, handler, filteredValue }) => {
    return (
        <div className='filter-box'>
            <h3 className='filter-title'>{label}</h3>
            {filters?.map((item) => (
                <div className='filter-list' key={item.value}>
                    <input type="checkbox"
                        onChange={() => handler(item.value, label)}
                        id={item.value}
                        name={label}
                        value={item.value}
                        checked={filteredValue.includes(item.value)}
                    />
                    <label htmlFor={item.value}></label>
                    <span>{item.label}</span>

                </div>
            ))
            }
        </div >
    )
}

export default Filters
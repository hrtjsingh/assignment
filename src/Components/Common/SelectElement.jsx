import React, { useState } from 'react'
import { FaSortDown } from "react-icons/fa";

const SelectElement = ({ sortingHandler }) => {
    const [sortType, setSortType] = useState("Sort By ID")

    const changeHandler = (value) => {
        setSortType(value === "asc" ? 'Ascending' : 'Descending')
        sortingHandler(value)
    }
    return (

        <div className="dropdown">
            <button className="dropbtn">{sortType} <FaSortDown /></button>
            <div className="dropdown-content">
                <span onClick={() => changeHandler("asc")}>Ascending</span>
                <span onClick={() => changeHandler("dsc")}>Descending</span>
            </div>
        </div>
    )
}

export default SelectElement
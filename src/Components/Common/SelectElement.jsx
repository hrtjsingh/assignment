import React, { useState } from 'react'
import { FaSortDown } from "react-icons/fa";

const SelectElement = ({ sortingHandler }) => {
    const [sortType, setSortType] = useState("Sort By ID")

    const changeHandler = (value) => {
        setSortType(value === "asc" ? 'Ascending' : 'Descending')
        sortingHandler(value)
    }
    return (
        // <select onChange={sortingHandler}>
        //     <option value="">
        //         Sort By ID
        //     </option>
        //     <option value="asc">
        //         Ascending
        //     </option>
        //     <option value="dsc">
        //         descending
        //     </option>
        // </select>
        <div class="dropdown">
            <button class="dropbtn">{sortType} <FaSortDown /></button>
            <div class="dropdown-content">
                <span onClick={() => changeHandler("asc")}>Ascending</span>
                <span onClick={() => changeHandler("dsc")}>Descending</span>
            </div>
        </div>
    )
}

export default SelectElement
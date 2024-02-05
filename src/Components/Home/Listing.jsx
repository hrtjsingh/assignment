import React, { useEffect, useMemo, useState } from 'react'
import { TbFilterStar } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";

import Filters from './Filters'
import SearchBar from './SearchBar'
import Card from './Card'
import useInfiniteScroll from '../../utils/useInfiniteScroll.js';
import { apiUrl, genderFilter, speciesFilter } from '../../utils/Constants.js';


const Listing = () => {
    const [data, setData] = useState([])
    const [tempData, setTempData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [filters, setFilters] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsEnd, setRecordsEnd] = useState(false);

    // const getData= (currentPage = 1) => {
    //     fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.info.pages === currentPage) {
    //                 setRecordsEnd(true)
    //             }
    //             setCurrentPage(prev => prev + 1)
    //             setIsLoading(false)
    //             setData(prev => [...prev, ...data.results])
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }

    const getData = async (currentPage = 1) => {
        try {
            let res = await fetch(`${apiUrl}/character?page=${currentPage}`)
            res = await res.json()
            if (res.info.pages === currentPage) {
                setRecordsEnd(true)
            }
            setCurrentPage(prev => prev + 1)
            setIsLoading(false)
            setData(prev => [...prev, ...res.results])
        } catch (error) {
            console.log(error)
        }
    }
    const { scrollRef } = useInfiniteScroll(() => {
        if (!recordsEnd) {
            getData(currentPage);
        }
    }, recordsEnd);
    useEffect(() => {
        if (filters.length > 0) {
            filterCharacters()
        } else {
            getData()
        }
    }, [filters])

    const searchHandler = (type = "search") => {
        if (type === "clear") {
            setSearchValue("")
            setData([])
            getData()
            return
        }
        if (searchValue.length > 2) {
            const fillterd = data.filter((item) => item.name.toLowerCase().includes(searchValue))
            setData(fillterd)
        }
    }

    const filterHandler = useMemo(() => {
        return (value) => {
            if (filters.includes(value)) {
                const filterData = filters.filter((item) => item !== value);
                setFilters(filterData);
            } else {
                setFilters((prevFilters) => [...prevFilters, value]);
            }
        };
    }, [filters]);

    const sortingHandler = (value) => {
        let sortedData;
        if (value === "asc") {
            sortedData = [...data].sort((a, b) => a.id - b.id);
        } else {
            sortedData = [...data].sort((a, b) => b.id - a.id);
        }
        setData(sortedData);
    };

    function filterCharacters() {
        const filterdData = data.filter(character => {
            if (
                filters.includes(character.gender.toLowerCase()) ||
                filters.includes(character.species.toLowerCase())
            ) {
                return true;
            }
        });
        setTempData(filterdData)
    }

    const showFilters = (type = "hide") => {
        const ele = document.getElementById("filters")
        if (type === "show") {
            ele.style.display = 'block';
            return
        }
        ele.style.display = 'none';
    }

    return (
        <div className='conatiner'>
            <div className='filterIcon'>
                <TbFilterStar onClick={() => showFilters("show")} />
            </div>
            <div className='filters' id="filters">
                <IoCloseOutline
                    size={30}
                    className='filter-close'
                    onClick={() => showFilters("hide")}
                />
                <h1 className='filter-heading'>
                    Filters
                </h1>
                <Filters
                    label="species"
                    filters={speciesFilter}
                    handler={filterHandler}
                    filteredValue={filters}
                />
                <Filters
                    label="gender"
                    filters={genderFilter}
                    handler={filterHandler}
                    filteredValue={filters}
                />
            </div>
            <div className='contant'>
                <div>
                    <SearchBar
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handler={searchHandler}
                        sortingHandler={sortingHandler}
                    />
                </div>
                {filters.length > 0 && <div className='pill-container'>
                    {filters.map((filter) => (
                        <div className='filter-pill' key={filter}>
                            {filter}
                            <IoCloseOutline
                                className='icon'
                                onClick={() => filterHandler(filter)}
                            />
                        </div>
                    ))}
                </div>}
                <div className='listing' ref={scrollRef}>
                    {filters.length > 0 ?
                        tempData?.map((item) => (
                            <Card key={Math.random()} data={item} />
                        )) :
                        data?.map((item) => (
                            <Card key={Math.random()} data={item} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Listing
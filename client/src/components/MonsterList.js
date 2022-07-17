import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import MHWIcon from '../images/MHW_Icon.png';
import ReactPaginate from 'react-paginate';

const MonsterList = (props) => {
    const [monsters, setMonsters] = useState([]);
    const navigate = useNavigate();

    const [filterData, setFilterData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const monstersPerPage = 10;
    const pagesVisited = pageNumber * monstersPerPage;
    const pageCount = Math.ceil(monsters.length / monstersPerPage);

    useEffect(() => {
        axios.get('https://mhw-db.com/monsters')
            .then((res) => {
                console.log(res.data)
                setMonsters(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = monsters.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase())
        });

        if (searchWord === "") {
            setFilterData([]);
        }
        else {
            setFilterData(newFilter);
        }
    }

    const displayMonsters = monsters
    .sort((a, b) => (a.name > b.name) ? 1: -1)
    .slice(pagesVisited, pagesVisited + monstersPerPage)
    .map((monster, index) => {
        return (
            <tr key={index}>
                <td>{monster.name}</td>
                <td>{monster.type}</td>
                <td>{monster.species}</td>
                <td><Link to={`/monsters/${monster.id}`} className="link-text">Details</Link></td>
            </tr>
        )
    })

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Container>
            <div className='d-flex justify-content-between align-items-center header'>
                <h4><img src={MHWIcon} className="mhw-icon"></img><u>Monster Hunter: World</u></h4>
                <Link to={"/"} className="link-text">Logout</Link>
            </div>
            <div className='mhw-body'>
                <div className='d-flex flex-column align-items-center'>
                    <h2>Monster Drop Tracker</h2>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center mt-2'>
                    <Link to={'/dashboard'} className="link-text">Return to Dashboard</Link>
                </div>
                <hr></hr>
                <div className='d-flex justify-content-between alignt-items-center mb-3 mt-4'>
                    <h3>List of Monsters:</h3>
                    <div>
                        <input type="text" placeholder='Search...' className="s-icon" onChange={(handleFilter)}></input>
                        <div>
                            {
                                filterData.length != 0 && (
                                    <div className='search-m'>
                                    {
                                        filterData.slice(0, 15).map((monster, index) => {
                                            return <Link className='search-r' to={`/monsters/${monster.id}`} target="_blank" style={{textDecoration: 'none'}}>
                                                <p>{monster.name}</p>
                                            </Link>
                                        })
                                    }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                    <Table striped bordered hover className='m-body'>
                        <thead>
                            <tr className='t-head'>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Species</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayMonsters} 
                            <ReactPaginate 
                                previousLabel={"<"}
                                nextLabel={">"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationButtons"}
                                previousLinkClassName={"previousButton"}
                                nextLinkClassName={"nextButton"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </tbody>
                    </Table>
            </div>
        </Container>
    )
}

export default MonsterList;
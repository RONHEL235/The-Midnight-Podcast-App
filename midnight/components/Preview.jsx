import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PreviewImages = styled.img `
    border-radius: 1rem;
    margin: 0.5rem;
`

const PreviewItems = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 1rem;
    font-family: Roboto;
    font-weight: 600;
    padding: 1rem;
    margin-left: 50px;
`

const PreviewPageItems = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const AZFilter = styled.div `
    font-family: 'Roboto';
    font-weight: bold;
    margin-left: 80%;
    margin-bottom: 20px;
    font-size: 17px;
`

const DateFilter = styled.div`
    font-family: 'Roboto';
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 17px;
`

const TheFilters = styled.div`
    display: flex;
    gap: 20px;
`

const Header = styled.h2`
    font-family: 'Roboto';
    margin-left: 75px;
    padding-top: 25px;
`

export default function Preview() {
    const [shows, setShows] = React.useState([])
    const [sortOrder, setSortOrder] = React.useState('A - Z')
    const [sortOrderDate, setSortOrderDate] = React.useState('Recent')
    
    React.useEffect(() => {
        fetch("https://podcast-api.netlify.app")
        .then(res => res.json())
        .then(data => setShows(data))
    }, [])

    const handleSort = (order) => {
        setSortOrder(order)
        let sortedShows = [...shows]
        if (order === 'A - Z') {
            sortedShows.sort((a, b) => a.title.localeCompare(b.title))
        }else {
            sortedShows.sort((a, b) => b.title.localeCompare(a.title))
        }
        setShows(sortedShows)
    }

    const handleSortDate = (order) => {
        setSortOrderDate(order)
        let sortedShows = [...shows]
        if (order === 'Recent') {
          sortedShows.sort((a, b) => new Date(b.updated) - new Date(a.updated))
        } else {
          sortedShows.sort((a, b) => new Date(a.updated) - new Date(b.updated))
        }
        setShows(sortedShows)
      }

    return (
        <div>
            <Header>All shows you can watch</Header>
            <TheFilters>
                <AZFilter>
                    <label htmlFor='sortOrder'>Sort by : </label>
                    <select id='sortOrder' onChange={(event) => handleSort(event.target.value)} value={sortOrder}>
                        <option style={{fontFamily: 'Roboto'}} value='A - Z'>A - Z</option>
                        <option style={{fontFamily: 'Roboto'}} value='Z - A'>Z - A</option>
                    </select>
                </AZFilter>
                <DateFilter style={{ marginBottom: '20px' }}>
                    <label htmlFor='sortOrderDate'>Sort by Date: </label>
                    <select id='sortOrderDate' onChange={(e) => handleSortDate(e.target.value)} value={sortOrderDate}>
                        <option value='Newest'>Recent</option>
                        <option value='Oldest'>Oldest</option>
                    </select>
                </DateFilter>
            </TheFilters>
            <PreviewItems>
                {shows.map(show => (
                    <Link style={{textDecoration: 'none',  color: 'inherit'}} key={show.id} to={`/shows/${show.id}`}>
                        <PreviewPageItems >
                            <PreviewImages 
                            src={show.image} 
                            alt= "podcast thumbnail"
                            style={{height: '100px', background: ''}} />
                            <div>
                                <div style={{padding: 6}}>{show.title}</div>
                                <div style={{padding: 6}}>Seasons: {show.seasons}</div>
                                <div style={{padding: 6}}>Last updated: {new Date(show.updated).toDateString()}</div>
                                {/* <div>Genre:{show.genres}</div> */}
                            </div>
                        </PreviewPageItems>
                    </Link>
                ))}
            </PreviewItems>
        </div>
    )
}
import React from 'react'
import Navbar from './Navbar'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'

const PreviewImages = styled.img `
    border-radius: 0.2rem;
    margin: 0.5rem;
`

const PreviewItems = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 1.9rem;
    font-family: Roboto;
    font-weight: 600;
    padding: 1rem;
    margin-left: 30px;
    margin-right: 30px;
`

const PreviewPageItems = styled.div`
    display: flex;
    align-items: center;
    gap: 1.3rem;
    /* border: 0.1rem solid black; */
`

const AZFilter = styled.div `
    font-family: 'Roboto';
    font-weight: bold;
    margin-left: 71%;
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

const Header = styled.p`
    font-family: 'Roboto';
    font-size: 21px;
    font-weight: bold;
    margin-left: 56px;
    padding-top: 25px;
`

const GenreFilter = styled.div`
    font-family: 'Roboto';
    font-weight: bold;
    font-size: 17px;
`

export default function Preview() {
    const [shows, setShows] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [sortOrder, setSortOrder] = React.useState('A - Z')
    const [sortOrderDate, setSortOrderDate] = React.useState('Recent')
    const [selectedGenre, setSelectedGenre] = React.useState('All')
    const [searchTerm, setSearchTerm] = React.useState('') 
    
    React.useEffect(() => {
        fetch("https://podcast-api.netlify.app")
        .then(res => res.json())
        .then(data => {
            setShows(data)
            setLoading(false)
        })
        .catch(error => {
            console.error("Error fetching data:", error)
            setLoading(false)
        })
    }, [])

const genres = {
    1: 'Personal Growth',
    2:'True Crime and Investigative Journalism',
    3:'History',
    4:'Comedy',
    5:'Entertainment',
    6:'Business',
    7:'Fiction',
    8:'News',
    9:'Kids and Family'
}  

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

    const getGenreNames = (genreIds) => {
        return genreIds.map(genreId => genres[genreId]).join(', ')
    }

    const filteredShows = selectedGenre !== 'All'
    ? shows.filter(show =>
        show.genres.includes(parseInt(selectedGenre)) &&
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : shows.filter(show => {
        const titleMatches = show.title.toLowerCase().includes(searchTerm.toLowerCase())
        return titleMatches
    })
    return (
        <div>
            <Header>All shows you can watch</Header>
            {loading? (
                <Box sx={{ width: '100%'}}>
                    <LinearProgress />
                </Box>
            ) : (
                <>  
                    <Navbar setSearchTerm={setSearchTerm} />  
                    <TheFilters>
                        <AZFilter>
                            <select id='sortOrder' onChange={(event) => handleSort(event.target.value)} value={sortOrder}>
                                <option value='Order'>Select Sort Order</option>
                                <option style={{fontFamily: 'Roboto'}} value='A - Z'>A - Z</option>
                                <option style={{fontFamily: 'Roboto'}} value='Z - A'>Z - A</option>
                            </select>
                        </AZFilter>
                        <DateFilter style={{ marginBottom: '20px' }}>
                            <select id='sortOrderDate' onChange={(event) => handleSortDate(event.target.value)} value={sortOrderDate}>
                                <option value='Date'>Date</option>
                                <option value='Newest'>Recent</option>
                                <option value='Oldest'>Oldest</option>
                            </select>
                        </DateFilter>
                        <GenreFilter>
                            <select
                                id='genreFilter'
                                onChange={(event) => setSelectedGenre(event.target.value)}
                                value={selectedGenre}
                            >
                                <option value='All'>All Genres</option>
                                {Object.keys(genres).map(genreId => (
                                    <option key={genreId} value={genreId}>
                                        {genres[genreId]}
                                    </option>
                                ))}
                            </select>
                        </GenreFilter>
                    </TheFilters>
                    <PreviewItems>
                        {filteredShows.map(show => (
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
                                        <div style={{padding: 6}}>{getGenreNames(show.genres)}</div>
                                    </div>
                                </PreviewPageItems>
                            </Link>
                        ))}
                    </PreviewItems>
                </>
            )}
        </div>
    )
}
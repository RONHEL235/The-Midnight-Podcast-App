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
`

const PreviewPageItems = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

export default function Preview() {
    const [shows, setShows] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://podcast-api.netlify.app")
        .then(res => res.json())
        .then(data => setShows(data))
    }, [])

    return (
        <div>
            <h2 style={{padding: 30 ,fontFamily: 'Roboto'}}>All shows you can watch</h2>
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
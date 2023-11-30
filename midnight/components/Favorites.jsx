import React from 'react'
import Player from './Player'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RxCross2 } from "react-icons/rx"

const ShowEpisodes = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  margin: 1.5rem;
  margin-left: 48px;
  cursor: pointer;
  border: 0.1rem solid black;
`

const FavEpisode = styled.div`
    font-size: 19px;
    font-family: Roboto;
    padding: 16px;
`

const TheFilters = styled.div`
    margin-left: 80%;
`

const TheCross = styled.div`
    border: 0.1rem solid black;
    padding: 0.3rem;
`

export default function Favorites({ favoriteEpisodes, toggleFavorite }) {
    const [filterDate, setFilterDate] = React.useState('')
    const [sortOrder, setSortOrder] = React.useState('')
    const [selectedEpisode, setSelectedEpisode] = React.useState(null)

    const PlayEpisode = (episode) => {
      setSelectedEpisode(episode)
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleString()
    }

    const handleDateFilter = (event) => {
        const selectedValue = event.target.value
    
        let sortedEpisodes = [...favoriteEpisodes]
    
        switch (selectedValue) {
          case 'latest': {
            sortedEpisodes = sortedEpisodes.sort(
              (a, b) => new Date(b.timestamp).getTime() / 1000 - new Date(a.timestamp).getTime() / 1000
            )
            break
          }
          case 'oldest': {
            sortedEpisodes = sortedEpisodes.sort(
              (a, b) => new Date(a.timestamp).getTime() / 1000 - new Date(b.timestamp).getTime() / 1000
            )
            break
          }
          default:
            break
        }
    
        setFilterDate(selectedValue)
    }


    const handleSortOrder = (event) => {
        setSortOrder(event.target.value)
    }

    let filteredEpisodes = favoriteEpisodes

    if (filterDate !== '') {
        switch (filterDate) {
          case 'latest':
            filteredEpisodes = [...filteredEpisodes].sort(
              (a, b) => new Date(b.timestamp).getTime() / 1000 - new Date(a.timestamp).getTime() / 1000
            )
            break
          case 'oldest':
            filteredEpisodes = [...filteredEpisodes].sort(
              (a, b) => new Date(a.timestamp).getTime() / 1000 - new Date(b.timestamp).getTime() / 1000
            )
            break
          default:
            break
        }
    }

      if (sortOrder === 'asc') {
        filteredEpisodes.sort((a, b) => a.title.localeCompare(b.title))
      } else if (sortOrder === 'desc') {
        filteredEpisodes.sort((a, b) => b.title.localeCompare(a.title))
      }

    
    return (
        <div>
            <h2 style={{fontFamily: 'Roboto', marginLeft: 70, paddingTop: 25}}>Favorites</h2>
            <TheFilters>
                <select style={{margin: 10}} onChange={handleDateFilter}>
                    <option value="">Select Date</option>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <select onChange={handleSortOrder}>
                    <option value="">Select Sort Order</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>
            </TheFilters>
            {filteredEpisodes.map((episode) => (
                <ShowEpisodes key={episode.title}>
                    <FavEpisode style={{fontSize: 19}} onClick={() => PlayEpisode(episode)}>
                        <h4 style={{padding: 8}}>{episode.title}</h4>
                        <h5 style={{padding: 8}}>Episode : {episode.episode}</h5>
                        <h5 style={{padding: 8, fontFamily: 'Roboto'}} >Added on : {formatTimestamp(episode.timestamp)}</h5>
                    </FavEpisode>
                    <TheCross onClick={() => toggleFavorite(episode)}>
                        <RxCross2 />
                    </TheCross>
                </ShowEpisodes>
            ))}
            <div>
              {selectedEpisode && (
                <Player 
                  episodeTitle={selectedEpisode.title}
                  audioSource={selectedEpisode.file}
                />
              )}
            </div>
        </div>
    )
}

Favorites.propTypes = {
    favoriteEpisodes: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    toggleFavorite: PropTypes.func.isRequired,
}
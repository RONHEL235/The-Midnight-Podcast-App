import React from 'react'
import Player from './Player'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import { useParams} from 'react-router-dom'
import { BsSuitHeart } from "react-icons/bs"
import { BsSuitHeartFill } from "react-icons/bs"
import LinearProgress from '@mui/material/LinearProgress'

const ShowImage = styled.img `
  height: 300px;
  width: 350px;
  border-radius: 0.2rem;
  margin: 0.rem;
  `

const ShowEpisodesImage = styled.img `
  height: 100px;
  width: 110px;
  border-radius: 0.2rem;
  `  

const ShowHeader =styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1.3rem;
  font-family: Roboto;
  margin: 30px 110px 30px 50px;
  /* border: 0.1rem solid black; */
`

const ShowEpisodes = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.3rem;
  cursor: pointer;
  margin-left: 50px;
  /* border: 0.1rem solid black; */
`

const ShowGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  font-family: Roboto;
`

const Filtering = styled.select`
  margin-left: 57px;
  font-family: Roboto;
`

const EpisodeHeart = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 60px;
`

const AllEpisodes = styled.h2`
  padding: 30px 30px 30px 55px;
  font-family: Roboto;
`

const Heart = styled.div`
  margin-right: 10px;
`

export default function ShowDetails({ favoriteEpisodes, toggleFavorite }) {
  const [previewShow, setPreviewShow] = React.useState(null)
  const [selectedEpisode, setSelectedEpisode] = React.useState(null)
  const [selectedSeason, setSelectedSeason] = React.useState(null)
  const { id } = useParams()



  React.useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(res => res.json())
      .then(data => setPreviewShow(data))
      .catch(error => {
        console.error('Error fetching show details:', error)
        setPreviewShow(null)
      })
  }, [id])


  const handleFilter = (event) => {
    setSelectedSeason(event.target.value || null)
  }

  const PlayEpisode = (episode) => {
    setSelectedEpisode(episode)
  }

  if (previewShow) {
    const firstSeasonImage = previewShow.seasons[0].image
    const allSeasons = previewShow.seasons
    const episodesArray = selectedSeason
      ? allSeasons.find(season => season.title === selectedSeason)?.episodes || []
      : allSeasons.flatMap(season => season.episodes)

    return (
      <div>
        {/* Show header information */}
        <ShowHeader>
          <ShowImage src={firstSeasonImage} />
          <div>
            <h2 style={{ margin: 18 }}>{previewShow.title}</h2>
            <h3 style={{ margin: 18 }}>{previewShow.description}</h3>
          </div>
        </ShowHeader>

       {/* Season Filter Dropdown */}
       <Filtering onChange={handleFilter} value={selectedSeason || ''}>
          <option value="">All Seasons</option>
          {allSeasons.map(season => (
            <option key={season.title} value={season.title}>
              {season.title}
            </option>
          ))}
        </Filtering>

        {/*Episodes of the season */}    
        <AllEpisodes>{selectedSeason? `${episodesArray.length} Episodes` :'All Episodes'}</AllEpisodes>
        <ShowGrid> 
        {episodesArray.map(episode => (
            <EpisodeHeart key={episode.title}>
            <ShowEpisodes onClick={() => PlayEpisode(episode)}>
              <ShowEpisodesImage src={firstSeasonImage} />
              <div style={{fontSize: 19}}>
                <h4 style={{padding: 8}}>{episode.title}</h4>
                <h5 style={{padding: 8}}>Episode : {episode.episode}</h5>
              </div>
              </ShowEpisodes>
              <Heart onClick={() => toggleFavorite(episode)}>
                  {favoriteEpisodes.some(
                    (favEpisode) => favEpisode.title === episode.title
                    )
                    ? <BsSuitHeartFill />
                    : <BsSuitHeart />}
              </Heart>
            </EpisodeHeart>              
        ))}
        </ShowGrid>
        {selectedEpisode && (
          <Player 
            episodeTitle={selectedEpisode.title}
            episodeImage={selectedEpisode.firstSeasonImage}
            audioSource={selectedEpisode.file}
          />
        )}
      </div>
    )
  } else {
    return (
    <Box sx={{ width: '100%'}}>
      <LinearProgress />
    </Box>
    )
  }
}

ShowDetails.propTypes = {
  favoriteEpisodes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
}
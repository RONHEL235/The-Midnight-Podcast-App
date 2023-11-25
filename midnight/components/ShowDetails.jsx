import React from 'react'
import styled from 'styled-components'
import Player from './Player'
import { useParams} from 'react-router-dom'


const ShowImage = styled.img `
  height: 300px;
  width: 350px;
  border-radius: 1rem;
  margin: 0.5rem;
  `

const ShowEpisodesImage = styled.img `
  height: 100px;
  width: 110px;
  border-radius: 1rem;
  margin: 0.5rem;
  `  

const ShowHeader =styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1.5rem;
  font-family: Roboto;
`

const ShowEpisodes = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem;
  cursor: pointer;
`

const ShowGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 0.5rem;
  font-family: Roboto;
`

const Filtering = styled.select`
  margin-left: 35px;
  font-family: Roboto;
`

export default function ShowDetails() {
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
            <h1 style={{ margin: 18 }}>{previewShow.title}</h1>
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
        <h2 style={{ margin: 30, fontFamily: 'Roboto'}}>{selectedSeason? `${episodesArray.length} Episodes` :'All Episodes'}</h2>
        <ShowGrid> 
        {episodesArray.map(episode => (
            <ShowEpisodes onClick={() => PlayEpisode(episode)} key={episode.title}>
              <ShowEpisodesImage src={firstSeasonImage} />
              <div style={{fontSize: 19}}>
                <h4 style={{padding: 8}}>{episode.title}</h4>
                <h5 style={{padding: 8}}>Episode:{episode.episode}</h5>
              </div>
            </ShowEpisodes>
        ))}
        </ShowGrid>
        {selectedEpisode && (
          <Player 
            episodeTitle={selectedEpisode.title}
            audioSource={selectedEpisode.file}
          />
        )}
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}
import './styles.css'
import React from 'react'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Preview from './components/Preview'
import Loginout from './components/Loginout'
import Favorites from './components/Favorites'
import ShowDetails from './components/ShowDetails'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const MainContainer = styled.div`
  margin-top: ${(props) => (props.showNavbar ? '0' : '60px')}
  transition: margin-top 0.1s ease
`

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [shows, setShows] = React.useState([])
  const [favoriteEpisodes, setFavoriteEpisodes] = React.useState([])
  const [showNavbar, setShowNavbar] = React.useState(true)

  React.useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => {
        setShows(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  const updateShows = (searchTerm) => {
    if (searchTerm === '') {
      return shows
    } else {
      const fuse = new Fuse(shows, {
        keys: ['title'],
        threshold: 0.3,
      });
      return fuse.search(searchTerm)
    }
  }

  const filteredShows = updateShows(searchTerm)

  const toggleFavorite = (episode) => {
    const isFavorite = favoriteEpisodes.find(
      (favEpisode) => favEpisode.title === episode.title
    )

    if (isFavorite) {
      const updatedFavorites = favoriteEpisodes.filter(
        (favEpisode) => favEpisode.title !== episode.title
      )
      setFavoriteEpisodes(updatedFavorites)
    } else {
      const timestamp = new Date().toISOString()
      setFavoriteEpisodes([...favoriteEpisodes, { ...episode, timestamp }])
    }
  }

  return (
  <div >
    <Router>
    <MainContainer showNavbar={showNavbar}>
    {showNavbar && <Navbar setSearchTerm={setSearchTerm} shows={shows} />}
      <Routes>
        <Route exact path="/" element={<Loginout setShowNavbar={setShowNavbar} />} />
        <Route exact path="/signup" element={<SignUp  setShowNavbar={setShowNavbar}/>} />
        <Route exact path="/preview" element={<Preview shows={filteredShows} />} />
        <Route path="/shows/:id" element={<ShowDetails
        favoriteEpisodes={favoriteEpisodes} 
        toggleFavorite={toggleFavorite} />} />
        <Route path="/favorites" element={<Favorites
         favoriteEpisodes={favoriteEpisodes}
         toggleFavorite={toggleFavorite} />} />
      </Routes>
      </MainContainer>
    </Router>
  </div>
  )
}
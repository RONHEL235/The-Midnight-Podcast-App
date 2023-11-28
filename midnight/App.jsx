import './styles.css'
import React from 'react'
import Navbar from './components/Navbar'
import Preview from './components/Preview'
import Favorites from './components/Favorites'
import ShowDetails from './components/ShowDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [favoriteEpisodes, setFavoriteEpisodes] = React.useState([])

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
  <div>
    <Router>
    <Navbar setSearchTerm={setSearchTerm} />
      <Routes>
        <Route exact path="/" element={<Preview />} />
        <Route path="/shows/:id" element={<ShowDetails
        favoriteEpisodes={favoriteEpisodes} 
        toggleFavorite={toggleFavorite} />} />
        <Route path="/favorites" element={<Favorites
         favoriteEpisodes={favoriteEpisodes}
         toggleFavorite={toggleFavorite} />} />
      </Routes>
    </Router>
  </div>
  )
}
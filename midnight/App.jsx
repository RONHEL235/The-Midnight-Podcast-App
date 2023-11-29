import './styles.css'
import React from 'react'
import Navbar from './components/Navbar'
import Preview from './components/Preview'
import Favorites from './components/Favorites'
import ShowDetails from './components/ShowDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [shows, setShows] = React.useState([])
  const [favoriteEpisodes, setFavoriteEpisodes] = React.useState([])

  React.useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [])

  const updateShows = (searchTerm) => {
    if (searchTerm === '') {
      return shows; // If search term is empty, return all shows
    } else {
      const fuse = new Fuse(shows, {
        keys: ['title'],
        threshold: 0.3,
      });
      return fuse.search(searchTerm);
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
  <div>
    <Router>
    <Navbar setSearchTerm={setSearchTerm} shows={shows} />
      <Routes>
        <Route exact path="/" element={<Preview shows={filteredShows} />} />
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
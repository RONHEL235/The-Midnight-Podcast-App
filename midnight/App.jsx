import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Preview from './components/Preview'
import ShowDetails from './components/ShowDetails'
/* import Footer from './components/Footer' */
import './styles.css'


export default function App() {
  return (
  <div>
    <Navbar />
    <Router>
      <Routes>
        <Route exact path="/" element={<Preview />} />
        <Route path="/shows/:id" element={<ShowDetails />} />
      </Routes>
    </Router>
    {/* <Footer /> */}
  </div>
  )
}
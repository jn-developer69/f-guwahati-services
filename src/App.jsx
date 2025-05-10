import { useState } from 'react'
import './App.css'
import {Header, Home} from '@/Import';
import { Footer, Gallery } from './Import';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

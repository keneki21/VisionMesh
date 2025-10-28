import { useState } from 'react'

import './App.css'
import Navbar from './components/navbar'
import Home from './pages/Home'
import Footer from './components/Footer'

function App() {
  return (<>
  <Navbar />
  <Home />
  <Footer />
    </>
  )
}

export default App

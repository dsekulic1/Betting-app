import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.scss'

import MyRoutes from 'routing/MyRoutes'
import Navbar from 'shared/Header'

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Navbar />
        <div className='main-container'>
          <MyRoutes />
        </div>
      </Router>
    </div>
  )
}

export default App

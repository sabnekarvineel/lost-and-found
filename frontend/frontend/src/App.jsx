import React from 'react'
import Landing from './pages/landing'
import Lost from './pages/lost'
import Search from './pages/search'
import Found from './pages/found'
import Contact from './pages/contact'
import About from './pages/about'



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/lost' element={<Lost/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/found' element={<Found/>}/>
        <Route path='/about' element={<About/>}/>
        
        <Route path='/search' element={<Search/>}/>

      </Routes>
    </Router>

  )
}

export default App
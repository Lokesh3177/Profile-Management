
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ProfileManagement from './pages/ProfileManagement'
import './index.css'

function App() {
  const [currentProfile, setCurrentProfile] = useState(null)
  const [showManagement, setShowManagement] = useState(false)

  return (
    <div className="min-h-screen">
      <Navbar
        currentProfile={currentProfile}
        setCurrentProfile={setCurrentProfile}
        setShowManagement={setShowManagement}
      />

      <main className="pt-6">
        {showManagement ? (
          <ProfileManagement
            setShowManagement={setShowManagement}
            setCurrentProfile={setCurrentProfile}
          />
        ) : (
          <LandingPage
            setCurrentProfile={setCurrentProfile}
            setShowManagement={setShowManagement}
          />
        )}
      </main>
    </div>
  )
}

export default App

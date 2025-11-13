import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ProfileManagement from './pages/ProfileManagement'

function App() {
    const [currentProfile, setCurrentProfile] = useState(null)
    const [showManagement, setShowManagement] = useState(false)

    return (
        <div className="App">
            <Navbar
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
                setShowManagement={setShowManagement}
            />
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
        </div>
    )
}

export default App

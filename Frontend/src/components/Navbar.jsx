import React, { useState, useRef, useEffect } from 'react'
import './Navbar.css'
import ProfileDropdown from './ProfileDropdown'

function Navbar({ currentProfile, setCurrentProfile, setShowManagement }) {
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h1>👤 Profile Manager</h1>
                </div>

                <div className="navbar-right" ref={dropdownRef}>
                    {currentProfile ? (
                        <>
                            <button
                                className="profile-btn"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <div className="profile-avatar">
                                    {currentProfile.profileImage ? (
                                        <img src={`http://localhost:3001${currentProfile.profileImage}`} alt={currentProfile.name} />
                                    ) : (
                                        <span>{currentProfile.name.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                <span className="profile-name">{currentProfile.name}</span>
                                <span className="dropdown-arrow">▼</span>
                            </button>

                            {showDropdown && (
                                <ProfileDropdown
                                    profile={currentProfile}
                                    setCurrentProfile={setCurrentProfile}
                                    setShowDropdown={setShowDropdown}
                                    setShowManagement={setShowManagement}
                                />
                            )}
                        </>
                    ) : (
                        <button
                            className="login-btn"
                            onClick={() => setShowManagement(true)}
                        >
                            Get Started
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar

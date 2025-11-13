import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './LandingPage.css'

function LandingPage({ setCurrentProfile, setShowManagement }) {
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProfiles()
    }, [])

    const fetchProfiles = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/profiles')
            setProfiles(response.data.data || [])
        } catch (error) {
            console.error('Error fetching profiles:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSelectProfile = (profile) => {
        setCurrentProfile(profile)
    }

    return (
        <div className="landing-page">
            <div className="landing-container">
                <div className="landing-hero">
                    <h2>Welcome to Profile Manager</h2>
                    <p>Manage your profiles efficiently with our intuitive interface</p>
                    <button className="create-btn" onClick={() => setShowManagement(true)}>
                        ➕ Create New Profile
                    </button>
                </div>

                <div className="profiles-section">
                    <h3>Available Profiles</h3>
                    {loading ? (
                        <div className="loading">Loading profiles...</div>
                    ) : profiles.length > 0 ? (
                        <div className="profiles-grid">
                            {profiles.map((profile) => (
                                <div key={profile._id} className="profile-card">
                                    <div className="profile-card-image">
                                        {profile.profileImage ? (
                                            <img src={`http://localhost:3001${profile.profileImage}`} alt={profile.name} />
                                        ) : (
                                            <div className="default-avatar">
                                                {profile.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="profile-card-content">
                                        <h4>{profile.name}</h4>
                                        <p className="email">📧 {profile.email}</p>
                                        <p className="phone">📱 {profile.phone}</p>
                                        {profile.bio && <p className="bio">{profile.bio}</p>}
                                    </div>
                                    <button
                                        className="select-btn"
                                        onClick={() => handleSelectProfile(profile)}
                                    >
                                        Select Profile
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No profiles found. Create your first profile to get started!</p>
                            <button className="create-btn" onClick={() => setShowManagement(true)}>
                                ➕ Create First Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LandingPage

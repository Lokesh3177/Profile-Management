import React from 'react'
import './ProfileDropdown.css'

function ProfileDropdown({ profile, setCurrentProfile, setShowDropdown, setShowManagement }) {
    const handleLogout = () => {
        setCurrentProfile(null)
        setShowDropdown(false)
    }

    const handleEdit = () => {
        setShowManagement(true)
        setShowDropdown(false)
    }

    return (
        <div className="dropdown-menu">
            <div className="dropdown-profile-card">
                <div className="dropdown-avatar">
                    {profile.profileImage ? (
                        <img src={`http://localhost:3001${profile.profileImage}`} alt={profile.name} />
                    ) : (
                        <span>{profile.name.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                <div className="dropdown-info">
                    <h3>{profile.name}</h3>
                    <p className="email">{profile.email}</p>
                    <p className="phone">📱 {profile.phone}</p>
                </div>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-actions">
                <button className="dropdown-action-btn view" onClick={handleEdit}>
                    ✏️ Edit Profile
                </button>
                <button className="dropdown-action-btn logout" onClick={handleLogout}>
                    🚪 Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileDropdown

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ProfileManagement.css'

function ProfileManagement({ setShowManagement, setCurrentProfile }) {
    const [profiles, setProfiles] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        profileImage: null,
    })
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    // IMPORTANT: Use Vercel Environment Variable for Backend URL
    const API_BASE = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetchProfiles()
    }, [])

    const fetchProfiles = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_BASE}/api/profiles`)
            setProfiles(response.data.data || [])
        } catch (error) {
            console.error('Error fetching profiles:', error)
            setMessage('Error fetching profiles')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.email || !formData.phone) {
            setMessage('Please fill in all required fields')
            return
        }

        try {
            setLoading(true)
            const data = new FormData()
            data.append('name', formData.name)
            data.append('email', formData.email)
            data.append('phone', formData.phone)
            data.append('bio', formData.bio)
            if (formData.profileImage) data.append('profileImage', formData.profileImage)

            if (editingId) {
                await axios.put(`${API_BASE}/api/profiles/${editingId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                setMessage('Profile updated successfully!')
                setEditingId(null)
            } else {
                await axios.post(`${API_BASE}/api/profiles`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                setMessage('Profile created successfully!')
            }

            setFormData({ name: '', email: '', phone: '', bio: '', profileImage: null })
            fetchProfiles()
            setTimeout(() => setMessage(''), 3000)
        } catch (error) {
            console.error('Error saving profile:', error)
            setMessage(error.response?.data?.message || 'Error saving profile')
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (profile) => {
        setFormData({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            bio: profile.bio || '',
            profileImage: null,
        })
        setEditingId(profile._id)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this profile?')) return
        try {
            setLoading(true)
            await axios.delete(`${API_BASE}/api/profiles/${id}`)
            setMessage('Profile deleted successfully!')
            fetchProfiles()
            setTimeout(() => setMessage(''), 3000)
        } catch (error) {
            console.error('Error deleting profile:', error)
            setMessage('Error deleting profile')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setFormData({ name: '', email: '', phone: '', bio: '', profileImage: null })
    }

    const handleSelectProfile = (profile) => {
        setCurrentProfile(profile)
        setShowManagement(false)
    }

    return (
        <div className="profile-management">
            <div className="management-container">
                <button className="back-btn" onClick={() => setShowManagement(false)}>
                    ← Back to Dashboard
                </button>

                <div className="management-content">
                    <div className="form-section">
                        <h2>{editingId ? 'Edit Profile' : 'Create New Profile'}</h2>

                        {message && (
                            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-group">
                                <label>Profile Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={editingId ? true : false}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows="4"
                                />
                            </div>

                            <div className="form-group">
                                <label>Profile Picture</label>
                                <input type="file" name="profileImage" onChange={handleImageChange} />
                            </div>

                            <div className="form-actions">
                                <button type="submit" disabled={loading} className="submit-btn">
                                    {loading ? 'Saving...' : editingId ? 'Update Profile' : 'Create Profile'}
                                </button>

                                {editingId && (
                                    <button type="button" className="cancel-btn" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="profiles-list-section">
                        <h2>All Profiles</h2>

                        {loading && <div className="loading">Loading...</div>}

                        {profiles.length > 0 ? (
                            <div className="profiles-list">
                                {profiles.map((profile) => (
                                    <div key={profile._id} className="profile-item">
                                        <div className="profile-item-info">
                                            <div className="profile-item-avatar">
                                                {profile.profileImage ? (
                                                    <img src={`${API_BASE}${profile.profileImage}`} alt={profile.name} />
                                                ) : (
                                                    <span>{profile.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="profile-item-details">
                                                <h4>{profile.name}</h4>
                                                <p>{profile.email}</p>
                                                <p>{profile.phone}</p>
                                            </div>
                                        </div>

                                        <div className="profile-item-actions">
                                            <button className="select-profile-btn" onClick={() => handleSelectProfile(profile)}>
                                                Select
                                            </button>
                                            <button className="edit-btn" onClick={() => handleEdit(profile)}>
                                                Edit
                                            </button>
                                            <button className="delete-btn" onClick={() => handleDelete(profile._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>No profiles yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileManagement

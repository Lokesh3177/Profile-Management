
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function LandingPage({ setCurrentProfile, setShowManagement }) {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(false)
  const API_BASE = import.meta.env.VITE_API_URL ?? ''

  useEffect(() => {
    fetchProfiles()
    
  }, [])

  async function fetchProfiles() {
    try {
      setLoading(true)
      const res = await axios.get(`${API_BASE}/api/profiles`)
      setProfiles(res.data.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-slate-900">Welcome to Profile Manager</h2>
          <p className="mt-2 text-lg text-slate-600">Manage your profiles efficiently with our intuitive interface</p>
          <button
            onClick={() => setShowManagement(true)}
            className="mt-6 inline-flex items-center gap-3 bg-white text-brand-600 px-6 py-3 rounded-full shadow-md hover:shadow-lg"
          >
            ➕ Create New Profile
          </button>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-glass">
          <h3 className="text-2xl font-bold mb-6">Available Profiles</h3>

          {loading ? (
            <div className="text-center py-12 text-brand-600">Loading profiles...</div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {profiles.map(p => (
                <article key={p._id} className="rounded-lg overflow-hidden bg-gradient-to-br from-slate-50 to-white border">
                  <div className="h-44 bg-gradient-to-br from-brand-400 to-indigo-600">
                    {p.profileImage ? (
                      <img src={p.profileImage} alt={p.name} className="w-full h-full object-cover"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-4xl">{p.name?.charAt(0)}</div>
                    )}
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{p.name}</h4>
                    <div className="text-sm text-brand-600 break-words">{p.email}</div>
                    <div className="text-sm text-slate-500">{p.phone}</div>
                    <p className="mt-2 text-slate-500 italic">{p.bio}</p>

                    <div className="mt-4 flex gap-2">
                      <button onClick={() => setCurrentProfile(p)} className="flex-1 bg-gradient-to-r from-brand-500 to-indigo-600 text-white py-2 rounded-md">Select Profile</button>
                      <button onClick={() => setShowManagement(true) } className="px-3 py-2 border rounded-md">Edit</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

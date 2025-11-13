
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProfileManagement({ setShowManagement, setCurrentProfile }) {
  const [profiles, setProfiles] = useState([])
  const [form, setForm] = useState({ name:'', email:'', phone:'', bio:'', profileImage: null })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const API_BASE = import.meta.env.VITE_API_URL ?? ''

  useEffect(() => { fetchProfiles() }, [])

  async function fetchProfiles(){
    try{
      setLoading(true)
      const res = await axios.get(`${API_BASE}/api/profiles`)
      setProfiles(res.data.data || [])
    }catch(e){ console.error(e) }finally{ setLoading(false) }
  }

  function onChange(e){
    const { name, value, files } = e.target
    if(name === 'profileImage') setForm(prev => ({ ...prev, profileImage: files[0] || null }))
    else setForm(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e){
    e.preventDefault()
    if(!form.name || !form.email || !form.phone){ alert('Fill required fields'); return }
    try{
      setLoading(true)
      const data = new FormData()
      data.append('name', form.name)
      data.append('email', form.email)
      data.append('phone', form.phone)
      data.append('bio', form.bio)
      if(form.profileImage) data.append('profileImage', form.profileImage)

      if(editingId){
        await axios.put(`${API_BASE}/api/profiles/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await axios.post(`${API_BASE}/api/profiles`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      setForm({ name:'', email:'', phone:'', bio:'', profileImage: null })
      setEditingId(null)
      fetchProfiles()
    }catch(e){
      console.error(e)
      alert(e.response?.data?.message || 'Error saving profile')
    }finally{ setLoading(false) }
  }

  async function onDelete(id){
    if(!confirm('Delete?')) return
    try{ setLoading(true); await axios.delete(`${API_BASE}/api/profiles/${id}`); fetchProfiles() }catch(e){ console.error(e) }finally{ setLoading(false) }
  }

  function onEdit(profile){
    setForm({ name:profile.name, email:profile.email, phone:profile.phone, bio:profile.bio, profileImage: null })
    setEditingId(profile._id)
    window.scrollTo({top:0, behavior:'smooth'})
  }

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-glass">
          <button onClick={() => setShowManagement(false)} className="text-sm text-slate-500 mb-3">← Back to Dashboard</button>
          <h3 className="text-2xl font-semibold mb-4">{editingId ? 'Edit Profile' : 'Create New Profile'}</h3>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Profile Name *</label>
              <input name="name" value={form.name} onChange={onChange} className="mt-1 block w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Email *</label>
              <input name="email" value={form.email} onChange={onChange} disabled={!!editingId} className="mt-1 block w-full border rounded-md px-3 py-2 bg-white/95"/>
            </div>

            <div>
              <label className="block text-sm font-medium">Phone *</label>
              <input name="phone" value={form.phone} onChange={onChange} className="mt-1 block w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Bio</label>
              <textarea name="bio" value={form.bio} onChange={onChange} className="mt-1 block w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Profile Picture</label>
              <input name="profileImage" type="file" accept="image/*" onChange={onChange} className="mt-1" />
            </div>

            <div className="flex gap-2">
              <button disabled={loading} className="flex-1 bg-gradient-to-r from-brand-500 to-indigo-600 text-white py-2 rounded-md">{loading ? 'Saving...' : (editingId ? 'Update Profile' : 'Create Profile')}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name:'',email:'',phone:'',bio:'',profileImage:null }) }} className="px-4 py-2 border rounded-md">Cancel</button>}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-glass">
          <h3 className="text-2xl font-semibold mb-4">All Profiles</h3>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {profiles.map(p => (
              <div key={p._id} className="flex items-center gap-4 p-3 rounded-md border">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {p.profileImage ? <img src={p.profileImage} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-slate-100 text-brand-500 font-bold">{p.name?.charAt(0)}</div>}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{p.name}</div>
                  <div className="text-sm text-brand-600 truncate">{p.email}</div>
                  <div className="text-sm text-slate-500">{p.phone}</div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => { setCurrentProfile(p) }} className="px-3 py-1 rounded-md text-white bg-brand-500">Select</button>
                  <button onClick={() => onEdit(p)} className="px-3 py-1 rounded-md bg-amber-400">Edit</button>
                  <button onClick={() => onDelete(p._id)} className="px-3 py-1 rounded-md bg-red-500 text-white">Delete</button>
                </div>
              </div>
            ))}
            {profiles.length === 0 && <div className="text-slate-500">No profiles yet.</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

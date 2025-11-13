
import React from 'react'

export default function ProfileDropdown({ profile, setCurrentProfile, setShowDropdown, setShowManagement }) {
  if (!profile) return null

  return (
    <div className="w-72 bg-white rounded-xl shadow-soft-lg overflow-hidden">
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border">
          {profile.profileImage ? (
            <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover"/>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-brand-500 font-bold">{profile.name?.charAt(0)}</div>
          )}
        </div>
        <div>
          <div className="font-semibold">{profile.name}</div>
          <div className="text-xs text-slate-500 truncate">{profile.email}</div>
        </div>
      </div>

      <div className="border-t px-3 py-2">
        <button
          onClick={() => { setShowManagement(true); setShowDropdown(false) }}
          className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
        >
          ✏️ Edit Profile
        </button>

        <button
          onClick={() => { setCurrentProfile(null); setShowDropdown(false) }}
          className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-rose-600"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  )
}

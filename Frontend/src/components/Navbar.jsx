
import React, { useRef, useEffect, useState } from 'react'
import ProfileDropdown from './ProfileDropdown'

export default function Navbar({ currentProfile, setCurrentProfile, setShowManagement }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-brand-500 text-2xl">👤</div>
            <div>
              <h1 className="text-brand-600 font-semibold text-xl leading-none">Profile Manager</h1>
              <p className="text-sm text-slate-500">Manage profiles quickly</p>
            </div>
          </div>

          <div className="flex items-center" ref={ref}>
            {currentProfile ? (
              <>
                <button
                  className="flex items-center gap-3 px-3 py-2 rounded-full bg-gradient-to-r from-brand-500 to-indigo-600 text-white shadow-soft-lg"
                  onClick={() => setOpen(v => !v)}
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
                    {currentProfile.profileImage ? (
                      <img src={currentProfile.profileImage} alt={currentProfile.name} className="w-full h-full object-cover"/>
                    ) : (
                      <div className="flex items-center justify-center bg-white text-brand-500 font-bold">{currentProfile.name?.charAt(0)}</div>
                    )}
                  </div>
                  <span className="font-semibold">{currentProfile.name}</span>
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 111.06-1.06L10 9.86l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 7.21z"/></svg>
                </button>

                {open && (
                  <div className="absolute right-4 top-16">
                    <ProfileDropdown
                      profile={currentProfile}
                      setCurrentProfile={setCurrentProfile}
                      setShowManagement={setShowManagement}
                      setShowDropdown={setOpen}
                    />
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => setShowManagement(true)}
                className="px-4 py-2 rounded-full bg-white border border-slate-200 text-brand-600 shadow-sm hover:shadow-md"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

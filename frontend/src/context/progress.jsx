import React, { createContext, useContext, useEffect, useState } from 'react'

const ProgressCtx = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState({ eco_points: 0, badges: [], completed: [] })

  async function refresh() {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/progress')
      const data = await res.json()
      setState(data)
    } catch (e) {
      console.error('Failed to fetch progress', e)
    }
  }

  async function log(item) {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/progress/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
      const data = await res.json()
      setState(data)
    } catch (e) {
      console.error('Failed to log progress', e)
    }
  }

  useEffect(() => { refresh() }, [])

  return <ProgressCtx.Provider value={{ state, log, refresh }}>{children}</ProgressCtx.Provider>
}

export function useProgress() { return useContext(ProgressCtx) }

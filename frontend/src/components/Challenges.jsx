import React, { useEffect, useState } from 'react'
import { useProgress } from '../context/progress'

export default function Challenges() {
  const [age, setAge] = useState(10)
  const [difficulty, setDifficulty] = useState('easy')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { log } = useProgress()

  async function fetchChallenges() {
    setLoading(true)
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/challenges/suggest', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ age: Number(age), difficulty })
      })
      const data = await res.json()
      setItems(data.challenges || [])
    } catch (e) {
      console.error('Failed to fetch challenges', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ fetchChallenges() }, [])

  return (
    <div className="card">
      <div style={{display:'grid', gap:'.6rem'}}>
        <div style={{display:'flex', gap:'.5rem', alignItems:'center', flexWrap:'wrap'}}>
          <input className="input" type="number" value={age} onChange={e=>setAge(e.target.value)} min={5} max={15} style={{maxWidth:'120px'}} />
          <select className="input" value={difficulty} onChange={e=>setDifficulty(e.target.value)} style={{maxWidth:'220px'}}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button className="secondary" onClick={fetchChallenges} disabled={loading}>{loading? 'Refreshing...':'Refresh'}</button>
        </div>

        <div className="list">
          {items.map(it => (
            <div key={it.id} className="chat-bubble">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700}}>{it.title}</div>
                  <div style={{opacity:.8}}>{it.description}</div>
                </div>
                <button className="primary" onClick={()=>log({ item_id: it.id, kind:'challenge', points: it.eco_points||5, badge: it.badge||null, details:{ title: it.title } })}>
                  Done +{it.eco_points||5}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

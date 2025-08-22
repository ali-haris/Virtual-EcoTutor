import React, { useState } from 'react'
import { useProgress } from '../context/progress'

export default function Chat() {
  const [q, setQ] = useState('How can I save water?')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastQuestion, setLastQuestion] = useState(null)
  const { log } = useProgress()

  async function ask(question) {
    const prompt = question || q
    if (!prompt || !prompt.trim()) return
    setLoading(true)
    setMessages(prev => [...prev, {role:'user', content:prompt}])
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/chat', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ question: prompt })
      })
      const data = await res.json()
      setMessages(prev => [...prev, {role:'ai', content: data.reply || 'No reply.'}])
      setLastQuestion(prompt)
      setQ('')
      log({ item_id: 'chat-' + Date.now(), kind:'chat', points: data.eco_points_awarded || 0, details: {} })
    } catch (e) {
      setMessages(prev => [...prev, {role:'ai', content:'Error: Could not reach the server.'}])
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  function handleAsk() { ask(q) }
  function handleRegenerate() { if(lastQuestion) ask(lastQuestion) }

  return (
    <div className="card">
      <div style={{display:'grid', gap:'.6rem'}}>
        <textarea rows={3} className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask anything eco-friendly..." />
        <div style={{display:'flex', gap:'.5rem', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', gap:'.5rem'}}>
            <button className="primary" onClick={handleAsk} disabled={loading}>{loading? 'Asking...' : 'Ask Green Mentor'}</button>
            <button className="secondary" onClick={handleRegenerate} disabled={!lastQuestion || loading}>{loading? 'Waiting...':'Regenerate'}</button>
          </div>
          <span className="progress-pill">Eco Chat earns points!</span>
        </div>
        <div className="list">
          {messages.map((m,i)=>(
            <div key={i} className={"chat-bubble " + (m.role==='ai'? 'ai-bubble':'')}>
              <strong>{m.role==='ai'?'Green Mentor':'You'}:</strong> {m.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

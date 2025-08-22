import React, { useState } from 'react'
import Chat from '../components/Chat'
import Quizzes from '../components/Quizzes'
import Challenges from '../components/Challenges'
import { ProgressProvider, useProgress } from '../context/progress'

function Header() {
  return (
    <div className="hero">
      <div className="container hero-inner">
        <div className="brand">
          <img src="/assets/logo.png" alt="logo" />
          <div>
            <h1>Green Mentor Chatbot</h1>
            <p>Learn planet-loving habits with friendly chat, quizzes, and real-life eco challenges.</p>
            {/* <div className="badges">
              <span className="badge">Kid-Friendly</span>
              <span className="badge">Eco-Points</span>
              <span className="badge">Badges</span>
            </div> */}
          </div>
        </div>
        {/* <img src="/assets/bg.svg" alt="background" style={{width:'100%', borderRadius:'16px'}} /> */}
      </div>
    </div>
  )
}

function Tabs({ tab, setTab }) {
  const tabs = ['Chat', 'Quizzes', 'Challenges']
  return (
    <div className="container">
      <div className="tabs">
        {tabs.map(t => (
          <button key={t} className={'tab ' + (tab===t? 'active':'')} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>
    </div>
  )
}

function ProgressBar() {
  const { state } = useProgress()
  return (
    <div className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <div><strong>Eco-Coins 🌿:</strong> {state.eco_points}</div>
      <div style={{display:'flex', gap:'.4rem', flexWrap:'wrap'}}>
        {state.badges.map(b => <span key={b} className="progress-pill">{b}</span>)}
      </div>
    </div>
  )
}

function Content({ tab }) {
  return (
    <div className="row container" style={{marginTop:'1rem'}}>
      <div style={{display:'grid', gap:'1rem'}}>
        {tab==='Chat' && <Chat />}
        {tab==='Quizzes' && <Quizzes />}
        {tab==='Challenges' && <Challenges />}
      </div>
      <div style={{display:'grid', gap:'1rem'}}>
        <ProgressBar />
        <div className="card">
          <h3 style={{marginTop:0}}>Tips ⭐</h3>
          <ul>
            <li>Small actions add up! Try one eco challenge each day.</li>
            <li>Ask Green Mentor anything—there are no silly questions.</li>
            <li>Collect badges and show your impact to friends and family.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="container footer">
      <span>© {new Date().getFullYear()} Green Mentor. Built with love for our planet.</span>
      <img src="/assets/footer.png" alt="plants" />
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('Chat')
  return (
    <ProgressProvider>
      <Header />
      <Tabs tab={tab} setTab={setTab} />
      <Content tab={tab} />
      <Footer />
    </ProgressProvider>
  )
}

import React, { useEffect, useState } from 'react'
import { useProgress } from '../context/progress'

export default function Quizzes() {
  const [topic, setTopic] = useState('Saving Water')
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(false)
  const { log } = useProgress()

  async function generate() {
    setLoading(true)
    setScore(null)
    setAnswers({})
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/quizzes/generate', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ topic, num_questions: 5 })
      })
      const data = await res.json()
      setQuiz(data)
    } catch (e) {
      console.error('Failed to generate quiz', e)
    } finally {
      setLoading(false)
    }
  }

  function submit() {
    if (!quiz) return
    let s = 0
    quiz.questions?.forEach(q => {
      if (answers[q.id] === q.answer) s++
    })
    setScore(s)
    const total = quiz?.questions?.length || 0
    const points = 2 * s
    const badge = s === total ? 'Quiz Whiz' : (s >= Math.ceil(total/2) ? 'Eco Learner' : null)
    log({ item_id: 'quiz-' + Date.now(), kind:'quiz', points, badge, details:{ topic, score:s } })
  }

  useEffect(()=>{ generate() }, [])

  return (
    <div className="card">
      <div style={{display:'grid', gap:'.6rem'}}>
        <div style={{display:'flex', gap:'.5rem', alignItems:'center'}}>
          <input className="input" value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Quiz topic (e.g., Composting)" />
          <button className="secondary" onClick={generate} disabled={loading}>{loading? 'Generating...':'New Quiz'}</button>
        </div>

        {quiz && (
          <div style={{display:'grid', gap:'.6rem'}}>
            <h3 style={{margin:0}}>{quiz.title || 'Eco Quiz'}</h3>
            {quiz.questions?.map(q => (
              <div key={q.id} className="chat-bubble">
                <div style={{fontWeight:700}}>{q.question}</div>
                <div style={{display:'grid', gap:'.4rem', marginTop:'.4rem'}}>
                  {q.options?.map(opt => (
                    <label key={opt} style={{display:'flex', gap:'.4rem', alignItems:'center'}}>
                      <input type="radio" name={q.id} checked={answers[q.id]===opt} onChange={()=>setAnswers({...answers, [q.id]:opt})} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div style={{display:'flex', gap:'.5rem', alignItems:'center'}}>
              <button className="primary" onClick={submit}>Submit Answers</button>
              {score !== null && <span className="progress-pill">Score: {score}/{quiz.questions?.length||0}</span>}
            </div>
          </div>
        )}

        {!quiz && !loading && <div style={{opacity:.8}}>No quiz yet — press <strong>New Quiz</strong>.</div>}
      </div>
    </div>
  )
}

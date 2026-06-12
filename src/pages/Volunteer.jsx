import { useState } from 'react'

const API_BASE = 'https://nofinishnrbdjango.fly.dev'

const initial = { fullName: '', email: '', phone: '', availability: '', skills: '', motivation: '' }

export default function Volunteer() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/volunteers/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      setMessage('Thank you for volunteering! We will be in touch soon.')
      setForm(initial)
    } catch (err) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <>
      {/* Hero Heaeder */}
      <header className="hero-header">
        <div className="container mx-auto px-4">
          <h1>Become a Volunteer</h1>
          <p>
            Join us at NO FINISH LINE Nairobi 2025 and make a lasting impact on children living with mental impairments.
            Your time and skills can change lives.
          </p>
        </div>
      </header>

      {/* Impact Visualization */}
      <section className="bg-[#E52D2F] py-12 my-10 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Your Time Makes a Difference</h2>
          <p>Every hour you volunteer directly supports children with mental health challenges</p>
          <div className="flex justify-center flex-wrap gap-8 mt-8">
            <div className="impact-card">
              <h3>6</h3>
              <p>Hours of Volunteering</p>
            </div>
            <div className="impact-card">
              <h3>=</h3>
              <p>Equals</p>
            </div>
            <div className="impact-card">
              <h3>2</h3>
              <p>Children Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-white p-10 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-center text-[#E52D2F] text-3xl font-bold mb-8">Volunteer Application</h2>

          {status === 'success' && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-6">{message}</div>
          )}
          {status === 'error' && (
            <div className="bg-red-100 text-red-800 p-4 rounded mb-6">{message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name*</label>
              <input type="text" value={form.fullName} onChange={set('fullName')} required />
            </div>
            <div className="form-group">
              <label>Email Address*</label>
              <input type="email" value={form.email} onChange={set('email')} required />
            </div>
            <div className="form-group">
              <label>Phone Number*</label>
              <input type="tel" value={form.phone} onChange={set('phone')} required />
            </div>
            <div className="form-group">
              <label>When are you available?*</label>
              <select value={form.availability} onChange={set('availability')} required>
                <option value="">Select availability</option>
                <option value="pre-event">Pre-Event (August 2025)</option>
                <option value="day1">September 5, 2025</option>
                <option value="day2">September 6, 2025</option>
                <option value="day3">September 7, 2025</option>
                <option value="flexible">Flexible - Any dates</option>
              </select>
            </div>
            <div className="form-group">
              <label>Relevant Skills*</label>
              <select value={form.skills} onChange={set('skills')} required>
                <option value="">Select your skills</option>
                <option value="event-mgmt">Event Management</option>
                <option value="first-aid">First Aid Certified</option>
                <option value="languages">Multilingual</option>
                <option value="sports">Sports/Coaching</option>
                <option value="mental-health">Mental Health Background</option>
                <option value="other">Other - Please specify in motivation</option>
              </select>
            </div>
            <div className="form-group">
              <label>Why do you want to volunteer with NO FINISH LINE?*</label>
              <textarea
                value={form.motivation}
                onChange={set('motivation')}
                required
                placeholder="Share what inspires you to join us..."
                style={{ minHeight: '120px', resize: 'vertical' }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#ff7e33] hover:bg-[#e66a2a] text-white py-4 px-8 rounded-lg font-semibold text-lg mt-4 disabled:opacity-60"
            >
              {status === 'loading' ? 'Submitting...' : 'Apply to Volunteer'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

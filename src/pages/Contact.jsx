import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex justify-center items-center"
        style={{ backgroundImage: "url('/hero6.png')", backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', color: 'white' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-2xl font-bold">Get in Touch with Us</div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4 md:px-16 lg:px-24">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

        {status === 'success' && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-6 max-w-md mx-auto">
            Your message has been sent! We'll be in touch soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={set('name')}
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={set('email')}
            required
            className="w-full p-3 border rounded"
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={set('message')}
            required
            rows={5}
            className="w-full p-3 border rounded"
          />
          <button type="submit" className="bg-[#E52D2F] text-white px-4 py-2 rounded w-full hover:bg-[#c22525]">
            Send Message
          </button>
        </form>

        <div className="mt-8 max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-2">Other Ways to Reach Us</h3>
          <p>Email: info@nofinishlinenairobi.org</p>
          <p>Phone: +254 112155383, +254 708061231</p>
          <p>Address: Uhuru Gardens, Nairobi, Kenya</p>
        </div>
      </section>
    </>
  )
}

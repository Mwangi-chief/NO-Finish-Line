import { useState, useEffect, useRef } from 'react'

const API_BASE = 'https://nofinishnrbdjango.fly.dev/api'

export default function Blog() {
  const [stories, setStories] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [clinicOpen, setClinicOpen] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  const [submitStatus, setSubmitStatus] = useState(null)
  const fileInputRef = useRef()

  useEffect(() => {
    fetch(`${API_BASE}/stories`)
      .then(r => r.json())
      .then(d => setStories(Array.isArray(d) ? d : d.data || []))
      .catch(() => {})

    fetch(`${API_BASE}/blog`)
      .then(r => r.json())
      .then(d => setBlogPosts(Array.isArray(d) ? d : d.data || []))
      .catch(() => {})
  }, [])

  async function handleChallengeSubmit(e) {
    e.preventDefault()
    if (!videoFile) return
    setSubmitStatus('loading')
    const fd = new FormData()
    fd.append('video', videoFile)
    try {
      const res = await fetch(`${API_BASE}/challenge`, { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setSubmitStatus('success')
      setVideoFile(null)
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex justify-center items-center"
        style={{ backgroundImage: "url('/hero5.png')", backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', color: 'white' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-2xl font-bold">Latest Updates and Stories</div>
      </section>

      <section className="py-12 px-4 md:px-16 lg:px-24">
        {/* Mental Health Clinics */}
        <div className="mb-16 bg-[#E52D2F] p-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-white">Pre-Event Mental Health Clinics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src="/clinic.jpg" alt="Mental Health Clinic" className="w-full rounded-lg shadow-md" onError={e => e.target.style.display='none'} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Free Clinics: September 1–3, 2025</h3>
              <p className="mb-4 text-white">
                Join our expert-led mental health clinics before the main event. Open to all participants and community members.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6 text-white">
                <li>Professional counseling sessions</li>
                <li>Mental health first aid training</li>
                <li>Parent-child therapy workshops</li>
                <li>Stress management techniques</li>
              </ul>
              <button
                onClick={() => setClinicOpen(!clinicOpen)}
                className="bg-white text-[#E52D2F] px-6 py-2 rounded-lg font-medium"
              >
                {clinicOpen ? 'Hide Schedule' : 'View Clinic Schedule'}
              </button>
              {clinicOpen && (
                <div className="mt-4 bg-white text-gray-800 p-4 rounded-lg text-sm">
                  <p className="font-semibold mb-2">Clinic Schedule</p>
                  <ul className="space-y-1">
                    <li>Sep 1 – 9am–12pm: Stress Management Workshop</li>
                    <li>Sep 2 – 9am–12pm: Mental Health First Aid</li>
                    <li>Sep 3 – 9am–12pm: Parent-Child Therapy Sessions</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Impact Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#E52D2F]">Mental Health Impact Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.length === 0 ? (
              <p className="text-gray-500 col-span-3">No impact stories available yet.</p>
            ) : (
              stories.map((story, i) => (
                <div key={i} className="border-l-4 border-blue-700 pl-4 bg-white rounded shadow p-4">
                  {story.image && <img src={story.image} alt={story.title} className="w-full h-40 object-cover rounded mb-3" />}
                  <h3 className="font-bold text-lg mb-1">{story.title}</h3>
                  <p className="text-gray-600 text-sm">{story.content || story.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* #BeatMentalSickness Challenge */}
        <div className="bg-orange-50 p-8 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#E52D2F] mb-2">#BeatMentalSickness Challenge</h2>
            <p className="text-lg">Share your story for a chance to win KES 200,000!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">How to Participate:</h3>
              <ol className="list-decimal pl-5 space-y-3 mb-6">
                <li>Create a 1–3 minute video about mental health awareness</li>
                <li>Post on Instagram/TikTok with #BeatMentalSickness</li>
                <li>Upload your entry below for official judging</li>
              </ol>
              <p className="text-sm text-gray-600">*Entries must be filmed in Kenya. Winner announced October 15, 2025.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <form onSubmit={handleChallengeSubmit}>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                  <i className="fas fa-cloud-upload-alt text-4xl text-[#E52D2F] mb-3"></i>
                  <p className="mb-2">Upload your challenge video</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#E52D2F] text-white px-6 py-2 rounded-lg font-medium inline-flex items-center"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    {videoFile ? videoFile.name : 'Select File'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={e => setVideoFile(e.target.files[0] || null)}
                  />
                  <p className="text-xs text-gray-500 mt-2">MP4 or MOV, max 100MB</p>
                </div>
                {submitStatus === 'success' && (
                  <p className="text-green-600 mb-3">Entry submitted successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 mb-3">Submission failed. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={!videoFile || submitStatus === 'loading'}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold disabled:opacity-50"
                >
                  {submitStatus === 'loading' ? 'Submitting...' : 'Submit Entry'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-[#E52D2F]">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogPosts.length === 0 ? (
              <p className="text-gray-500 col-span-3">No blog posts available yet.</p>
            ) : (
              blogPosts.map((post, i) => (
                <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                  {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm">{post.excerpt || post.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}

import { useState } from 'react'

export default function Blog() {
  const [clinicOpen, setClinicOpen] = useState(false)

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
              <h3 className="text-xl font-semibold mb-4 text-white">Free Clinics: July 12–14, 2026</h3>
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
                    <li>Jul 12 – 9am–12pm: Stress Management Workshop</li>
                    <li>Jul 13 – 9am–12pm: Mental Health First Aid</li>
                    <li>Jul 14 – 9am–12pm: Parent-Child Therapy Sessions</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* #BeatMentalSickness Challenge */}
        <div className="bg-orange-50 p-8 rounded-lg mb-16">
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
                <li>Tag us <strong>@nofinishlinenrb</strong> for official judging</li>
              </ol>
              <p className="text-sm text-gray-600">*Entries must be filmed in Kenya. Winner announced at the event.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fab fa-tiktok text-5xl text-gray-800 mb-4"></i>
              <h4 className="text-xl font-bold mb-2">Join the Challenge</h4>
              <p className="text-gray-600 mb-4">Post your video on TikTok or Instagram with #BeatMentalSickness to enter.</p>
              <a
                href="https://www.tiktok.com/@www.nofinishlinenrb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700"
              >
                <i className="fab fa-tiktok mr-2"></i> Visit Our TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Impact Stories – coming soon */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#E52D2F]">Mental Health Impact Stories</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center text-gray-500">
            <i className="fas fa-book-open text-4xl mb-4"></i>
            <p className="text-lg">Stories coming soon. Check back after the event!</p>
          </div>
        </div>

        {/* Blog Posts – coming soon */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-[#E52D2F]">Latest Blog Posts</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center text-gray-500">
            <i className="fas fa-pen-to-square text-4xl mb-4"></i>
            <p className="text-lg">Blog posts coming soon. Stay tuned!</p>
          </div>
        </div>
      </section>
    </>
  )
}

import { useState } from 'react'

const faqs = [
  {
    q: 'What is NO FINISH LINE (NFL)?',
    a: 'NO FINISH LINE (NFL) is a unique charity sports festival combining endurance running, wellness, and community activism to support children living with mental impairments. Founded in Monaco in 1999 under the patronage of HSH Prince Albert II, NFL has grown into a global series of events uniting participants worldwide to raise funds and awareness for vulnerable children.',
  },
  {
    q: 'When and where is the Nairobi NFL event?',
    a: 'The inaugural NFL Nairobi will take place from September 4–7, 2025 at Uhuru Gardens. The 72-hour endurance challenge begins at 2:00 PM on September 4th and concludes at 2:00 PM on September 7th.',
  },
  {
    q: 'How does the fundraising work?',
    a: 'For every kilometer you run or walk during the 72-hour event, sponsors and donors contribute funds to support children\'s mental health initiatives. You can also collect direct donations through your personal fundraising page. All proceeds go to selected Kenyan charities supporting children with mental impairments.',
  },
  {
    q: 'Who can participate?',
    a: 'The event is open to everyone – individuals, families, corporate teams, schools, and community groups. Participants can join as runners, walkers, or volunteers. There are no speed requirements or minimum distance obligations.',
  },
  {
    q: 'What are the registration fees?',
    a: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Adults (18+): KES 3,000</li>
        <li>Youth (12–17): KES 1,500</li>
        <li>Children under 12: Free (must be accompanied by registered adult)</li>
        <li>Corporate teams (5+ members): 10% discount</li>
      </ul>
    ),
  },
  {
    q: 'What should I bring to the event?',
    a: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Comfortable running/walking shoes</li>
        <li>Weather-appropriate athletic clothing</li>
        <li>Refillable water bottle</li>
        <li>Sun protection (hat, sunscreen)</li>
        <li>Personal medications if needed</li>
        <li>ID and registration confirmation</li>
      </ul>
    ),
  },
  {
    q: 'Are there facilities at the venue?',
    a: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Medical tents with first aid</li>
        <li>Hydration stations</li>
        <li>Rest areas with seating</li>
        <li>Restroom facilities</li>
        <li>Secure bag storage</li>
        <li>Food and beverage vendors</li>
      </ul>
    ),
  },
  {
    q: 'How can my company get involved?',
    a: (
      <>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Sponsoring the event at various levels</li>
          <li>Entering employee teams</li>
          <li>Matching employee fundraising</li>
          <li>Providing in-kind donations</li>
          <li>Volunteering during the event</li>
        </ul>
        <p className="mt-2">Contact our corporate partnerships team for more information.</p>
      </>
    ),
  },
  {
    q: 'How are the funds distributed?',
    a: (
      <>
        <p>100% of donations go directly to our partner charities supporting children with mental health challenges in Kenya. The funds are allocated to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Treatment and therapy programs</li>
          <li>Educational support</li>
          <li>Family counseling services</li>
          <li>Community awareness initiatives</li>
          <li>Facility improvements</li>
        </ul>
      </>
    ),
  },
  {
    q: 'Can I volunteer instead of running?',
    a: (
      <>
        <p>Absolutely! We need hundreds of volunteers for various roles including:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Course marshals</li>
          <li>Registration assistants</li>
          <li>Hydration station staff</li>
          <li>Medical support</li>
          <li>Cheer teams</li>
          <li>Set-up/clean-up crews</li>
        </ul>
        <p className="mt-2">Visit our Volunteer page to sign up.</p>
      </>
    ),
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <h3 onClick={() => setOpen(!open)}>
        {q}
        <i className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </h3>
      {open && <div className="pt-2 text-gray-600">{a}</div>}
    </div>
  )
}

export default function FAQ() {
  const [query, setQuery] = useState('')
  const filtered = faqs.filter(f => f.q.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      {/* Hero with search */}
      <section
        className="relative flex justify-center items-center"
        style={{ backgroundImage: "url('/hero4.png')", backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', color: 'white' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">HELP CENTER</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search the help center..."
              className="text-gray-700"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className="text-[#E52D2F]"><i className="fas fa-search"></i></button>
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-12 px-4 md:px-16 lg:px-24">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        {filtered.length === 0 ? (
          <p className="text-gray-500">No results found for "{query}".</p>
        ) : (
          filtered.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)
        )}
      </section>
    </>
  )
}

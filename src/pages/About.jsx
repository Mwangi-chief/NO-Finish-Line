export default function About() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative"
        style={{ backgroundImage: "url('/hero2.png')", backgroundSize: 'cover', backgroundPosition: 'center', height: '350px' }}
      >
        <div className="angled-overlay"></div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <div className="content-section" id="vision">
          <h2>Our Vision</h2>
          <p>
            We envision a Kenya where mental health is prioritized and every child with mental health challenges has
            access to quality care, education, and opportunities to thrive through community support and sports.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <img src="/image7.png" alt="Running Event" className="rounded-lg h-[300px] object-cover w-full" />
            <img src="/image8.png" alt="Community Support" className="rounded-lg h-[300px] object-cover w-full" />
          </div>
        </div>

        <div className="content-section" id="mission">
          <h2>Our Mission</h2>
          <p>
            To raise KES 100 million to build and equip a Children's Mental Health Education and Sports Centre at
            St. Catherine Special School in Busia, while reducing stigma through community engagement.
          </p>
        </div>

        <div className="content-section" id="why-mental-health">
          <h2>Why Mental Health Matters</h2>
          <p>
            1 in 4 Kenyans experience mental health conditions, yet 75% lack access to care. Through running, we're
            breaking stigma and providing critical resources for children who need them most.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <img src="/image9.png" alt="Team Support" className="rounded-lg h-[300px] object-cover w-full" />
            <img src="/image10.png" alt="Charity and Impact" className="rounded-lg h-[300px] object-cover w-full" />
          </div>
        </div>

        <div className="content-section" id="history">
          <h2>Our History</h2>
          <p>
            Founded in Monaco in 1999, NO FINISH LINE has grown into a global movement. Nairobi makes history in 2025
            as the first African host city, continuing our tradition of combining sport with social impact.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <img src="/image11.png" alt="Historic Marathon" className="rounded-lg h-[300px] object-cover w-full" />
            <img src="/image12.png" alt="Runners Community" className="rounded-lg h-[300px] object-cover w-full" />
          </div>
        </div>
      </section>
    </>
  )
}

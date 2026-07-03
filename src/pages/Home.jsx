import { useState, useEffect } from 'react'

const highlights = [
  { img: '/image1.png', title: 'No Finish Line Nairobi: A Journey of Strength', desc: 'Join us in celebrating the No Finish Line Nairobi. See the best moments.' },
  { img: '/image2.png', title: 'Running for Health: Run Moments', desc: 'Discover inspiring stories from runners who participated in the run.' },
  { img: '/image3.png', title: 'Celebrating Unity and Diversity', desc: 'Experience the joy of community at the No Finish Line Nairobi.' },
  { img: '/image4.png', title: 'Runners United: Strength in Numbers', desc: 'Runners from all walks of life join to promote wellness.' },
  { img: '/image5.png', title: 'Family and Friends: Running Together', desc: 'Friends and families join the run for fun and fitness.' },
  { img: '/image6.png', title: 'Inspiring Moments from the Run', desc: 'Catch the best highlights from the No Finish Line.' },
]

function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now()
    if (diff <= 0) return null
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Home() {
  const countdown = useCountdown('July 11, 2026 00:00:00')

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <img src="/image1.png" alt="No Finish Line Nairobi" className="w-full h-[85vh] object-cover object-center" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
          <h2 className="text-5xl font-bold mb-4">No Finish Line Nairobi</h2>
          <p className="text-xl mb-6">Keep Moving, Never Quit, Never Give up</p>
          <div className="text-3xl font-bold text-yellow-400 mb-4">
            {countdown ? (
              <span>
                {countdown.days} Days &nbsp;
                {countdown.hours} Hours &nbsp;
                {countdown.minutes} Minutes &nbsp;
                {countdown.seconds} Seconds
              </span>
            ) : (
              <span>EVENT STARTED!</span>
            )}
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.ticketsasa.com/events/no-finish-line-nairobi-run"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 px-6 py-3 rounded font-semibold hover:bg-yellow-600"
            >
              Register Now
            </a>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-12 px-4 md:px-16 lg:px-24">
        <h3 className="text-3xl font-bold mb-6 text-center">Event Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {highlights.map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={item.img}
                alt={`Event Image ${i + 1}`}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fas fa-bars text-white text-3xl"></i>
              </div>
              <div className="mt-4 px-2 pb-4">
                <p className="text-blue-800 font-semibold uppercase text-sm">Stories</p>
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-gray-700 mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 px-4 md:px-16 lg:px-24">
        <h3 className="text-3xl font-bold mb-4">About the No Finish Line Nairobi</h3>
        <p>
          NO FINISH LINE (NFL) is a unique charity sports festival combining endurance running, wellness, and community
          activism to support children. Founded in Monaco in 1999 under the patronage of HSH Prince Albert II, NFL has
          grown into a global series of events uniting participants worldwide to raise funds and awareness for vulnerable
          children.
        </p>
        <p className="mt-4">
          In July 11, 2026, Nairobi will host the first NFL event in Africa, organized by Extrathion Sports Limited in
          partnership with NO FINISH LINE International to raise funds for children with mental impairments. Over 100
          hours, thousands of runners, walkers, and volunteers will converge at Kasarani International Stadium to run,
          donate, and advocate for mental health—proving that every step counts.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 px-4 md:px-16 lg:px-24">
        <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
        <p>Email: info@nofinishlinenrb.com</p>
        <p>Phone: +254 714606660, +254 721342872</p>
        <p>Address: Runda, Nairobi, Kenya</p>
      </section>
    </>
  )
}

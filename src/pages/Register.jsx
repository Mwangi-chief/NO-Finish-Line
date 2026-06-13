const TICKETSASA_URL = 'https://www.ticketsasa.com/events/no-finish-line-nairobi-run'

export default function Register() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex justify-center items-center"
        style={{ backgroundImage: "url('/hero3.png')", backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', color: 'white' }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(229,45,47,0.7)' }}></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Register for No Finish Line Nairobi</h1>
          <p className="text-lg">July 11, 2026 · Kasarani International Stadium</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">

          {/* Fee info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-[#E52D2F]">Registration Fee</h2>
            <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
              <div className="font-semibold text-gray-700">Per participant:</div>
              <div className="font-bold text-xl">KES 3,000</div>
              <div className="font-semibold text-gray-700">Payment via:</div>
              <div>M-Pesa / Card</div>
            </div>
          </div>

          {/* Main CTA */}
          <h2 className="text-2xl font-bold mb-4">Register on TicketSasa</h2>
          <p className="text-gray-600 mb-8">
            Click the button below or scan the QR code to secure your spot for the event.
          </p>

          <a
            href={TICKETSASA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E52D2F] hover:bg-[#c22525] text-white text-xl font-bold px-10 py-5 rounded-lg shadow-lg mb-12 transition-colors"
          >
            <i className="fas fa-external-link-alt mr-3"></i>
            Register on TicketSasa
          </a>

          {/* QR Code */}
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-xl font-bold mb-2">Or scan the QR code</h3>
            <p className="text-gray-500 text-sm mb-6">Point your phone camera at the code below to register instantly</p>
            <div className="flex justify-center">
              <img
                src="/qr-register.png"
                alt="Registration QR Code"
                className="w-56 h-56 rounded-lg shadow-md border border-gray-200"
                onError={e => {
                  e.target.style.display = 'none'
                  document.getElementById('qr-placeholder').style.display = 'flex'
                }}
              />
              <div
                id="qr-placeholder"
                className="hidden w-56 h-56 rounded-lg border-2 border-dashed border-gray-300 flex-col items-center justify-center text-gray-400 text-sm text-center p-4"
              >
                <i className="fas fa-qrcode text-4xl mb-2"></i>
                <span>QR code coming soon</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-12 text-left bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-[#E52D2F]">Race Categories</h3>
            <ul className="space-y-2 text-gray-700">
              <li><i className="fas fa-running text-[#E52D2F] mr-2"></i>Children U13 — 3 km</li>
              <li><i className="fas fa-running text-[#E52D2F] mr-2"></i>Children U15 — 5 km</li>
              <li><i className="fas fa-running text-[#E52D2F] mr-2"></i>Youth U18 — 6 km</li>
              <li><i className="fas fa-running text-[#E52D2F] mr-2"></i>Youth U20 — 8 km</li>
              <li><i className="fas fa-running text-[#E52D2F] mr-2"></i>Adult — 50 km</li>
              <li><i className="fas fa-running text-[#E52D2F] mr-2"></i>Veteran — 30–50 km</li>
            </ul>
          </div>

        </div>
      </section>
    </>
  )
}

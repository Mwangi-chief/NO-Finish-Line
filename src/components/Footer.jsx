export default function Footer() {
  return (
    <footer className="bg-[#E52D2F] text-white py-8 mt-12">
      <div className="container mx-auto px-4 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">No Finish Line</h2>
            <p className="mt-2 text-sm">Keep Moving, Never Quit, Never Give Up.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-yellow-400"><i className="fab fa-facebook fa-lg"></i></a>
            <a href="#" className="text-white hover:text-yellow-400"><i className="fab fa-twitter fa-lg"></i></a>
            <a href="#" className="text-white hover:text-yellow-400"><i className="fab fa-instagram fa-lg"></i></a>
            <a href="https://www.tiktok.com/@www.nofinishlinenrb.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400" aria-label="No Finish Line TikTok"><i className="fab fa-tiktok fa-lg"></i></a>
          </div>
        </div>
        <hr className="my-4 border-white/30" />
        <div className="text-center text-sm">
          <p>&copy; 2026 No Finish Line. All rights reserved. | Designed by No Finish Line Team</p>
        </div>
      </div>
    </footer>
  )
}

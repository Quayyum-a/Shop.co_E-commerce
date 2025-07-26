import { Link } from 'react-router-dom'
import { Twitter, Facebook, Instagram, Github } from 'lucide-react'

const Footer = () => {
  return (
    <>
      {/* Newsletter Section */}
      <div className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 max-w-md">
              STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </h2>
            <div className="flex flex-col space-y-3 w-full md:w-auto">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full md:w-80 px-4 py-3 rounded-full text-black focus:outline-none"
                />
              </div>
              <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="text-2xl font-bold text-black mb-4 block">
                SHOP.CO
              </Link>
              <p className="text-gray-600 text-sm mb-6">
                We have clothes that suits your style and which you're proud to wear. From women to men.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-black">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-black">
                  <Github size={20} />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-black mb-4">COMPANY</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link to="/about" className="hover:text-black">About</Link></li>
                <li><Link to="/features" className="hover:text-black">Features</Link></li>
                <li><Link to="/works" className="hover:text-black">Works</Link></li>
                <li><Link to="/career" className="hover:text-black">Career</Link></li>
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h3 className="font-semibold text-black mb-4">HELP</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link to="/customer-support" className="hover:text-black">Customer Support</Link></li>
                <li><Link to="/delivery-details" className="hover:text-black">Delivery Details</Link></li>
                <li><Link to="/terms-conditions" className="hover:text-black">Terms & Conditions</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* FAQ Links */}
            <div>
              <h3 className="font-semibold text-black mb-4">FAQ</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link to="/account" className="hover:text-black">Account</Link></li>
                <li><Link to="/manage-deliveries" className="hover:text-black">Manage Deliveries</Link></li>
                <li><Link to="/orders" className="hover:text-black">Orders</Link></li>
                <li><Link to="/payments" className="hover:text-black">Payments</Link></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-semibold text-black mb-4">RESOURCES</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link to="/free-ebooks" className="hover:text-black">Free eBooks</Link></li>
                <li><Link to="/development-tutorial" className="hover:text-black">Development Tutorial</Link></li>
                <li><Link to="/how-to-blog" className="hover:text-black">How to - Blog</Link></li>
                <li><Link to="/youtube-playlist" className="hover:text-black">Youtube Playlist</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-300 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 mb-4 md:mb-0">
                Shop.co © 2000-2023, All Rights Reserved
              </p>
              <div className="flex space-x-4 items-center">
                {/* Visa */}
                <div className="h-6 w-10 bg-white rounded border border-gray-300 flex items-center justify-center">
                  <svg viewBox="0 0 40 24" className="h-4 w-8">
                    <path fill="#1A1F71" d="M16.7 13.3l1.5-8.4h2.4l-1.5 8.4h-2.4zm10.7-8.4c-.5-.2-1.2-.4-2.1-.4-2.3 0-3.9 1.2-3.9 2.9 0 1.3 1.2 2 2.1 2.4.9.4 1.2.7 1.2 1.1 0 .6-.7.9-1.4.9-.9 0-1.5-.1-2.3-.5l-.3-.1-.3 2c.5.2 1.5.4 2.5.4 2.4 0 4-1.2 4-3 0-1-.6-1.8-1.9-2.4-.8-.4-1.3-.7-1.3-1.1 0-.4.5-.8 1.5-.8.9 0 1.5.2 2 .4l.2.1.3-1.9zM34.1 4.9c-.6 0-1 .3-1.2 1l-4.3 10.3h2.4l.5-1.3h2.9l.3 1.3h2.1L34.1 4.9zm-1.8 6.7l1.2-3.2.7 3.2h-1.9zM20.5 4.9l-1.9 8.4h-2.3L14.7 7c-.1-.4-.2-.5-.5-.7-.5-.3-1.4-.6-2.1-.8l.1-.4h3.6c.5 0 .9.3 1 .8l.9 4.8 2.3-5.6h2.5z"/>
                  </svg>
                </div>

                {/* Mastercard */}
                <div className="h-6 w-10 bg-white rounded border border-gray-300 flex items-center justify-center">
                  <svg viewBox="0 0 40 24" className="h-4 w-8">
                    <circle cx="15" cy="12" r="7" fill="#EB001B"/>
                    <circle cx="25" cy="12" r="7" fill="#F79E1B"/>
                    <path fill="#FF5F00" d="M20 5.5a6.5 6.5 0 0 0 0 13 6.5 6.5 0 0 0 0-13z"/>
                  </svg>
                </div>

                {/* PayPal */}
                <div className="h-6 w-10 bg-white rounded border border-gray-300 flex items-center justify-center">
                  <svg viewBox="0 0 40 24" className="h-4 w-8">
                    <path fill="#003087" d="M18.5 7.5c0-2.2-1.8-4-4-4h-6c-.3 0-.6.2-.7.5l-2 12.5c0 .3.2.5.4.5h3l.8-5h1.8c3.6 0 6.5-2.9 6.5-6.5 0-.3 0-.7-.1-1 .2-.4.3-.7.3-1z"/>
                    <path fill="#009CDE" d="M31.5 7.5c0-2.2-1.8-4-4-4h-6c-.3 0-.6.2-.7.5l-2 12.5c0 .3.2.5.4.5h3l.8-5h1.8c3.6 0 6.5-2.9 6.5-6.5 0-.3 0-.7-.1-1 .2-.4.3-.7.3-1z"/>
                  </svg>
                </div>

                {/* Apple Pay */}
                <div className="h-6 w-10 bg-white rounded border border-gray-300 flex items-center justify-center">
                  <svg viewBox="0 0 40 24" className="h-4 w-8">
                    <path fill="#000" d="M19.5 5c-1.5 0-2.7 1.2-2.7 2.7 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7c0-1.5-1.2-2.7-2.7-2.7zm0 4.5c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8z"/>
                    <path fill="#000" d="M15 13h9v3h-9v-3zm2 1h5v1h-5v-1z"/>
                  </svg>
                </div>

                {/* Google Pay */}
                <div className="h-6 w-10 bg-white rounded border border-gray-300 flex items-center justify-center">
                  <svg viewBox="0 0 40 24" className="h-4 w-8">
                    <path fill="#4285F4" d="M19.3 11.5c0 .6-.1 1.1-.3 1.6l-1.8-1.4c.1-.3.1-.5.1-.8 0-.3 0-.5-.1-.8l1.8-1.4c.2.5.3 1 .3 1.6v1.2z"/>
                    <path fill="#34A853" d="M17.2 9.9c.3-.2.7-.3 1.1-.3.5 0 .9.1 1.2.4l1.3-1.3c-.7-.7-1.6-1.1-2.5-1.1-1.4 0-2.6.8-3.2 2l1.8 1.4c.1-.7.7-1.1 1.3-1.1z"/>
                    <path fill="#FBBC04" d="M15.9 11.5c0-.2 0-.4.1-.6l-1.8-1.4c-.2.6-.2 1.3 0 2l1.8-1.4c-.1-.2-.1-.4-.1-.6z"/>
                    <path fill="#EA4335" d="M17.2 13.1c-.6 0-1.2-.4-1.3-1.1l-1.8 1.4c.6 1.2 1.8 2 3.2 2 .9 0 1.8-.4 2.5-1.1l-1.3-1.3c-.3.3-.7.4-1.2.4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

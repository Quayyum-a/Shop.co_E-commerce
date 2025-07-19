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
              <div className="flex space-x-4">
                <img src="/visa.png" alt="Visa" className="h-6" />
                <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                <img src="/paypal.png" alt="PayPal" className="h-6" />
                <img src="/applepay.png" alt="Apple Pay" className="h-6" />
                <img src="/googlepay.png" alt="Google Pay" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer


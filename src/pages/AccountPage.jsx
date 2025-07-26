import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { User, Package, Heart, Settings, CreditCard, MapPin } from 'lucide-react'
import OrderHistory from '../components/OrderHistory'

const AccountPage = () => {
  const { user } = useSelector(state => state.auth)
  const [activeTab, setActiveTab] = useState('overview')

  const accountOptions = [
    {
      icon: User,
      title: 'Profile Information',
      description: 'Update your personal details and preferences',
      href: '#profile'
    },
    {
      icon: Package,
      title: 'Order History',
      description: 'View and track your recent orders',
      href: '#orders'
    },
    {
      icon: Heart,
      title: 'Wishlist',
      description: 'Manage your saved items',
      href: '#wishlist'
    },
    {
      icon: MapPin,
      title: 'Addresses',
      description: 'Manage shipping and billing addresses',
      href: '#addresses'
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Manage your saved payment methods',
      href: '#payment'
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Privacy, security, and notification preferences',
      href: '#settings'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">My Account</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600">
                Manage your account and track your orders
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Order History
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'wishlist'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Wishlist
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'overview' && (
            <div>
              {/* Account Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {accountOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <button
                      key={option.title}
                      onClick={() => {
                        if (option.href === '#orders') {
                          setActiveTab('orders')
                        } else if (option.href === '#wishlist') {
                          setActiveTab('wishlist')
                        }
                      }}
                      className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border border-gray-200 group w-full text-left"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                            <IconComponent size={24} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <Package size={32} className="text-gray-400" />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <Heart size={32} className="text-gray-400" />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Member Since</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(user?.dateJoined).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                    <User size={32} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && <OrderHistory />}

          {activeTab === 'wishlist' && (
            <div className="text-center py-12">
              <Heart size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Save items you love for later</p>
              <Link
                to="/shop"
                className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}

export default AccountPage

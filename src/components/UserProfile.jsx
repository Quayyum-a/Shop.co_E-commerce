import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, User, Mail, Phone, Settings, Heart, Package, LogOut, Edit2, Save } from 'lucide-react'
import { updateProfile, logout } from '../store/slices/authSlice'

const UserProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    preferences: {
      newsletter: user?.preferences?.newsletter || false,
      smsUpdates: user?.preferences?.smsUpdates || false,
      size: user?.preferences?.size || 'M'
    }
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.startsWith('preferences.')) {
      const prefName = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefName]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSave = () => {
    dispatch(updateProfile(formData))
    setIsEditing(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    onClose()
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart }
  ]

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent size={20} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors mt-8"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                    <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Account Information</h4>
                  <p className="text-sm text-gray-600">Member since: {user.dateJoined}</p>
                  <p className="text-sm text-gray-600">Account ID: #{user.id}</p>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Shopping Preferences</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Size
                    </label>
                    <select
                      name="preferences.size"
                      value={formData.preferences.size}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="XS">Extra Small (XS)</option>
                      <option value="S">Small (S)</option>
                      <option value="M">Medium (M)</option>
                      <option value="L">Large (L)</option>
                      <option value="XL">Extra Large (XL)</option>
                      <option value="XXL">2X Large (XXL)</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Communication Preferences</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium">Email Newsletter</label>
                        <p className="text-sm text-gray-600">Receive updates about new products and sales</p>
                      </div>
                      <input
                        type="checkbox"
                        name="preferences.newsletter"
                        checked={formData.preferences.newsletter}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-black focus:ring-black border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="font-medium">SMS Updates</label>
                        <p className="text-sm text-gray-600">Get notified about order status and shipping</p>
                      </div>
                      <input
                        type="checkbox"
                        name="preferences.smsUpdates"
                        checked={formData.preferences.smsUpdates}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-black focus:ring-black border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Order History</h3>
                <div className="text-center py-12">
                  <Package size={48} className="text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h4>
                  <p className="text-gray-600 mb-6">When you place orders, they'll appear here</p>
                  <button
                    onClick={onClose}
                    className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">My Wishlist</h3>
                <div className="text-center py-12">
                  <Heart size={48} className="text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h4>
                  <p className="text-gray-600 mb-6">Save items you love for later</p>
                  <button
                    onClick={onClose}
                    className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

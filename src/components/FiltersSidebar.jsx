import { useState } from 'react'
import { ChevronRight, ChevronUp, ChevronDown, X } from 'lucide-react'

const FiltersSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [priceRange, setPriceRange] = useState([50, 200])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState(['Large'])
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    size: true,
    dressStyle: true
  })

  const categories = [
    'T-shirts',
    'Shorts', 
    'Shirts',
    'Hoodie',
    'Jeans'
  ]

  const colors = [
    { name: 'Green', value: '#00C12B' },
    { name: 'Red', value: '#F50606' },
    { name: 'Yellow', value: '#F5DD06' },
    { name: 'Orange', value: '#F57906' },
    { name: 'Light Blue', value: '#06CAF5' },
    { name: 'Blue', value: '#063AF5' },
    { name: 'Purple', value: '#7D06F5' },
    { name: 'Pink', value: '#F506A4' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#000000' }
  ]

  const sizes = [
    'XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'
  ]

  const dressStyles = [
    'Casual',
    'Formal', 
    'Party',
    'Gym'
  ]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:static top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        border-r border-gray-200 overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={onClose} className="md:hidden">
              <X size={24} />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Categories</h3>
              <button onClick={() => toggleSection('categories')}>
                {expandedSections.categories ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            {expandedSections.categories && (
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-600">{category}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Price</h3>
              <button onClick={() => toggleSection('price')}>
                {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            {expandedSections.price && (
              <div>
                <div className="relative mb-4">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-2 bg-black rounded-lg pointer-events-none"
                       style={{
                         left: `${(priceRange[0] / 300) * 100}%`,
                         right: `${100 - (priceRange[1] / 300) * 100}%`
                       }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Colors</h3>
              <button onClick={() => toggleSection('colors')}>
                {expandedSections.colors ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            {expandedSections.colors && (
              <div className="grid grid-cols-5 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColors.includes(color.name) 
                        ? 'border-black' 
                        : 'border-gray-300'
                    } ${color.value === '#FFFFFF' ? 'border-gray-400' : ''}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColors.includes(color.name) && (
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${color.value === '#FFFFFF' || color.value === '#F5DD06' ? 'bg-black' : 'bg-white'}`} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Size */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Size</h3>
              <button onClick={() => toggleSection('size')}>
                {expandedSections.size ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            {expandedSections.size && (
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-2 text-sm rounded border ${
                      selectedSizes.includes(size)
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dress Style */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Dress Style</h3>
              <button onClick={() => toggleSection('dressStyle')}>
                {expandedSections.dressStyle ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            {expandedSections.dressStyle && (
              <div className="space-y-3">
                {dressStyles.map((style) => (
                  <div key={style} className="flex items-center justify-between">
                    <span className="text-gray-600">{style}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Apply Filter Button */}
          <button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Apply Filter
          </button>
        </div>
      </div>
    </>
  )
}

export default FiltersSidebar


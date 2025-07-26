import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Package, Eye, Truck, CheckCircle, Clock } from 'lucide-react'
import { loadOrders } from '../store/slices/orderSlice'

const OrderHistory = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.order)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(loadOrders())
  }, [dispatch])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock className="text-yellow-500" size={20} />
      case 'Shipped':
        return <Truck className="text-blue-500" size={20} />
      case 'Delivered':
        return <CheckCircle className="text-green-500" size={20} />
      default:
        return <Package className="text-gray-500" size={20} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Shipped':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'Delivered':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={64} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-600 mb-6">When you place orders, they'll appear here</p>
        <Link
          to="/shop"
          className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <div className="text-sm text-gray-600">
                    <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                    <p>{order.shippingInfo.address}</p>
                    {order.shippingInfo.apartment && <p>{order.shippingInfo.apartment}</p>}
                    <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Order Summary</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-1 border-t border-gray-200">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-200">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye size={16} />
                  <span>View Details</span>
                </button>
                
                {order.status === 'Delivered' && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <Package size={16} />
                    <span>Reorder</span>
                  </button>
                )}
                
                {order.status === 'Shipped' && (
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Truck size={16} />
                    <span>Track Package</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {orders.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-4">
            Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
          <button className="text-black font-medium hover:underline">
            Load More Orders
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderHistory

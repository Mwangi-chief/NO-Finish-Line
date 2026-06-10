import { useState, useEffect } from 'react'

const API_BASE = 'https://nofinishnrbdjango.fly.dev/api'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [cart, setCart] = useState([])
  const [delivery, setDelivery] = useState('pickup')
  const [checkoutStatus, setCheckoutStatus] = useState(null)

  const deliveryFees = { pickup: 0, nairobi: 200, kiambu: 300, thika: 350 }
  const deliveryLabels = { pickup: 'Event Pickup (Free)', nairobi: 'Nairobi CBD (KSh 200)', kiambu: 'Kiambu (KSh 300)', thika: 'Thika (KSh 350)' }

  const subtotal = cart.reduce((s, i) => s + i.price, 0)
  const total = subtotal + (deliveryFees[delivery] || 0)

  useEffect(() => {
    fetch(`${API_BASE}/shop/products/`)
      .then(r => r.json())
      .then(d => { setProducts(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => { setLoadError(true); setLoading(false) })
  }, [])

  function addToCart(product, size) {
    setCart(c => [...c, { name: product.name, price: product.price, size }])
  }

  async function checkout() {
    if (cart.length === 0) { alert('Your cart is empty!'); return }
    setCheckoutStatus('loading')
    try {
      const res = await fetch(`${API_BASE}/shop/orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, delivery: deliveryLabels[delivery] }),
      })
      const data = await res.json()
      alert(`Order placed successfully! Order ID: ${data.id || 'N/A'}`)
      setCart([])
      setCheckoutStatus(null)
    } catch {
      alert('Failed to place order. Please try again later.')
      setCheckoutStatus(null)
    }
  }

  return (
    <>
      {/* Shop Header */}
      <header className="bg-[#E52D2F] text-white py-16 text-center mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NO FINISH LINE Official Shop</h1>
          <p className="text-xl">Every purchase supports children with mental impairments</p>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:grid lg:grid-cols-3 gap-8 mb-12">
        {/* Product Grid */}
        <section className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {loading && (
            <div className="col-span-2 text-center text-lg text-gray-500 py-8">Loading products...</div>
          )}
          {loadError && (
            <div className="col-span-2 text-center text-red-500 py-8">Failed to load products. Please try again later.</div>
          )}
          {!loading && !loadError && products.length === 0 && (
            <div className="col-span-2 text-center text-gray-500 py-8">No products available.</div>
          )}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </section>

        {/* Cart Sidebar */}
        <aside className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-orange-500 lg:sticky lg:top-24 lg:h-fit">
          <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-orange-500 pb-3 mb-4">Your Cart</h2>
          <div className="max-h-96 overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cart.map((item, i) => (
                <div key={i} className="flex justify-between py-3 border-b border-gray-200">
                  <div>
                    <strong className="text-blue-900">{item.name}</strong><br />
                    <span className="text-sm text-gray-600">Size: {item.size}</span>
                  </div>
                  <div className="font-semibold">KSh {item.price.toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
          <div className="text-right mb-6">
            <span className="text-lg font-semibold text-blue-900">Total: KSh </span>
            <span className="text-2xl font-bold">{total.toLocaleString()}</span>
          </div>

          {/* Delivery Options */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Delivery Options</h3>
            <div className="space-y-2">
              {Object.entries(deliveryLabels).map(([key, label]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="radio"
                    id={key}
                    name="delivery"
                    checked={delivery === key}
                    onChange={() => setDelivery(key)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor={key} className="ml-2">{label}</label>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={checkout}
            disabled={checkoutStatus === 'loading'}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-60"
          >
            {checkoutStatus === 'loading' ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </aside>
      </main>
    </>
  )
}

function ProductCard({ product, onAddToCart }) {
  const sizes = product.sizes?.length ? product.sizes : ['One Size']
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [added, setAdded] = useState(false)

  function handleAdd() {
    onAddToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow hover:-translate-y-1 duration-300">
      <img
        src={product.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}`}
        alt={product.name}
        className="w-full h-48 object-cover border-b-4 border-orange-500"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-blue-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-3">{product.description}</p>
        <div className="text-2xl font-bold text-orange-500 mb-4">KSh {product.price?.toLocaleString()}</div>
        <div className="mb-4">
          <label className="block font-semibold text-blue-900 mb-2">Size:</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-3 py-1 border rounded transition-colors ${
                  selectedSize === s ? 'bg-orange-500 text-white border-orange-500' : 'hover:border-orange-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleAdd}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${added ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}`}
        >
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

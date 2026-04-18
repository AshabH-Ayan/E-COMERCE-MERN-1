import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../api/axios'

const Cart = () => {
    const [cart, setCart] = useState(null)
    const navigate = useNavigate()

    const getUserId = () => localStorage.getItem('userId')

    const loadCart = async () => {
        try {
            const userId = getUserId()
            if (!userId) {
                setCart({ items: [] })
                return
            }
            const res = await api.get(`/cart/${userId}`)
            setCart(res.data?.cart || { items: [] })
        } catch (error) {
            console.error(error)
            setCart({ items: [] })
        }
    }

    useEffect(() => {
        loadCart()
        window.addEventListener('cartUpdated', loadCart)
        return () => {
            window.removeEventListener('cartUpdated', loadCart)
        }
    }, [])

    const removeItem = async (productId) => {
        const userId = getUserId()
        await api.post('/cart/remove', { userId, productId })
        window.dispatchEvent(new Event('cartUpdated'))
    }

    const updateQty = async (productId, quantity) => {
        const userId = getUserId()
        if (quantity === 0) {
            await removeItem(productId)
            return
        }
        await api.post('/cart/update', { userId, productId, quantity })
        window.dispatchEvent(new Event('cartUpdated'))
    }

    if (!cart) {
        return (
            <div className="min-h-screen bg-[#FBFaf7] flex items-center justify-center font-sans">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#888888] animate-pulse">
                    Reviewing Manifest...
                </p>
            </div>
        )
    }

    const validItems = cart.items.filter(item => item.productId)

    const total = validItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    )

    return (
        <div className="min-h-screen bg-[#FBFaf7] text-[#1C1C1C] font-sans pt-12 pb-24 px-6 sm:px-12 lg:px-20 selection:bg-[#1A261D] selection:text-[#FBFaf7]">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Area */}
                <header className="border-b border-[#DCD9D0] pb-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#A09D94] font-semibold mb-2">Shopping Bag</p>
                        <h1 className="text-3xl lg:text-4xl font-serif">Your Selection</h1>
                    </div>
                    <button 
                        onClick={() => navigate('/')}
                        className="text-[10px] uppercase tracking-[0.2em] text-[#888888] hover:text-[#1C1C1C] transition-colors pb-1 border-b border-transparent hover:border-[#1C1C1C]"
                    >
                        Continue Exploring
                    </button>
                </header>

                {validItems.length === 0 ? (
                    <div className="py-24 text-center">
                        <span className="text-2xl text-[#C5B595] block mb-4">❦</span>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-[#888888]">The archive is currently empty.</p>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-16">
                        
                        {/* Items List */}
                        <div className="grow space-y-10">
                            {validItems.map((item) => (
                                <div
                                    key={item.productId._id}
                                    className="flex flex-col sm:flex-row gap-6 pb-10 border-b border-[#DCD9D0]/50 group"
                                >
                                    {/* Product Image */}
                                    <div className="w-full sm:w-32 h-40 bg-[#F2F1EC] shrink-0 overflow-hidden">
                                        <img
                                            src={item.productId?.image}
                                            alt={item.productId?.title}
                                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col justify-between grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-lg font-serif mb-1 uppercase tracking-wide">
                                                    {item.productId?.title}
                                                </h2>
                                                <p className="text-[11px] text-[#888888] uppercase tracking-widest">
                                                    Unit Price: TK {item.productId?.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.productId._id)}
                                                className="text-[10px] uppercase tracking-[0.2em] text-[#A09D94] hover:text-red-800 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-6">
                                            {/* Minimalist Qty Selector */}
                                            <div className="flex items-center border border-[#DCD9D0] bg-white">
                                                <button
                                                    onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                                                    className="px-4 py-2 hover:bg-[#F2F1EC] transition-colors"
                                                >
                                                    —
                                                </button>
                                                <span className="px-4 py-2 text-xs font-medium border-x border-[#DCD9D0]">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                                                    className="px-4 py-2 hover:bg-[#F2F1EC] transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="text-sm font-semibold tracking-wider">
                                                TK {(item.productId.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Sidebar */}
                        <aside className="w-full lg:w-80 shrink-0">
                            <div className="bg-white p-8 border border-[#DCD9D0] shadow-sm sticky top-24">
                                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1C1C1C] mb-6 border-b border-[#DCD9D0] pb-4">
                                    Order Summary
                                </h3>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-xs uppercase tracking-widest text-[#6B6B6B]">
                                        <span>Subtotal</span>
                                        <span>TK {total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs uppercase tracking-widest text-[#6B6B6B]">
                                        <span>Shipping</span>
                                        <span className="text-[10px]">Complimentary</span>
                                    </div>
                                </div>

                                <div className="border-t border-[#DCD9D0] pt-6 mb-10 flex justify-between items-baseline">
                                    <span className="text-sm font-serif">Total</span>
                                    <span className="text-lg font-bold">TK {total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={() => navigate("/checkout-address")}
                                    className="w-full bg-[#1C1C1C] text-[#FBFaf7] py-4 text-[11px] uppercase tracking-[0.25em] font-bold transition-all hover:bg-[#252525] active:scale-[0.98]"
                                >
                                    Proceed to Checkout
                                </button>

                                <div className="mt-6 flex items-center justify-center gap-2 opacity-40">
                                    <span className="text-[8px] tracking-[0.2em] uppercase">Secure Encrypted Transaction</span>
                                </div>
                            </div>
                        </aside>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
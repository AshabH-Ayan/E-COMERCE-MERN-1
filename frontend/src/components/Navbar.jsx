import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import api from '../api/axios'

const Navbar = () => {
    const navigate = useNavigate()
    const [cartCount, setCartCount] = useState(0)

    const loadCart = async () => {
        const userId = localStorage.getItem('userId')

        if (!userId) {
            setCartCount(0)
            return
        }

        try {
            const res = await api.get(`/cart/${userId}`)

            const items = res.data?.cart?.items || []

            const total = items.reduce(
                (sum, item) => sum + item.quantity,
                0
            )

            setCartCount(total)

        } catch (err) {
            if (err.response?.status === 404) {
                setCartCount(0)
            } else {
                console.error("Cart load error:", err)
            }
        }
    }

    useEffect(() => {
        loadCart()

        // ✅ listen for cart updates
        window.addEventListener('cartUpdated', loadCart)

        return () => {
            window.removeEventListener('cartUpdated', loadCart)
        }
    }, [])

    const logout = () => {
        localStorage.clear()
        setCartCount(0)
        navigate('/login')
    }

    const userId = localStorage.getItem('userId')

    return (
        <nav className="w-full bg-[#FBFaf7] border-b border-[#EAE7DF] px-8 py-5 flex justify-between items-center sticky top-0 z-50 font-sans">
            
            {/* Logo: Small but highly spaced serif for that crisp, tailored look */}
            <Link to="/" className="font-serif text-lg sm:text-xl font-medium tracking-[0.4em] uppercase text-[#121212] hover:opacity-70 transition-opacity duration-300">
                Riviera
            </Link>

            <div className="flex gap-6 sm:gap-8 items-center">
                
                {/* Auth Links: Tiny, but very high contrast and widely tracked so they are easily readable */}
                {!userId ? (
                    <>
                        <Link to="/login" className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#121212] hover:text-[#888888] transition-colors duration-300">
                            Login
                        </Link>
                        <Link to="/signup" className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#121212] hover:text-[#888888] transition-colors duration-300">
                            Signup
                        </Link>
                    </>
                ) : (
                    <button onClick={logout} className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#121212] hover:text-[#8B3A3A] transition-colors duration-300">
                        Logout
                    </button>
                )}

                {/* Micro-divider */}
                <div className="w-px h-3 bg-[#DCD9D0]"></div>

                {/* Cart: Clean text format, integrated count */}
                <Link to="/cart" className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#121212] hover:text-[#888888] transition-colors duration-300">
                    Cart {cartCount > 0 ? `(${cartCount})` : ''}
                </Link>

            </div>
        </nav>
    )
}

export default Navbar
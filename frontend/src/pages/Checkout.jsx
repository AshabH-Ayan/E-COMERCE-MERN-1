import { useState, useEffect } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router'

const Checkout = () => {
    const userId = localStorage.getItem("userId");
    const [addresses, setAddresses] = useState([]);
    const [cart, setCart] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) return;

        api.get(`/cart/${userId}`)
            .then((res) => {
                setCart(res.data?.cart || { items: [] });
            })
            .catch(() => {
                setCart({ items: [] });
            });

        api.get(`/address/${userId}`).then((res) => {
            const fetchedAddresses = res.data.addresses || [];
            setAddresses(fetchedAddresses);

            if (fetchedAddresses.length > 0) {
                setSelectedAddress(fetchedAddresses[0]);
            }
        });
    }, [userId]);

    const items = cart?.items || [];
    const validItems = items.filter(item => item.productId);

    const total = validItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    const placeOrder = async () => {
        if (!selectedAddress) {
            alert("Please select a delivery address");
            return;
        }

        if (validItems.length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {
            const res = await api.post("/order/place", {
                userId,
                address: selectedAddress,
            });

            window.dispatchEvent(new Event('cartUpdated'));
            navigate(`/order-success/${res.data.orderId}`);
        } catch (error) {
            console.error("Order placement failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#FBFaf7] text-[#1C1C1C] font-sans pt-12 pb-24 px-6 sm:px-12 lg:px-20 selection:bg-[#1A261D] selection:text-[#FBFaf7]">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <header className="border-b border-[#DCD9D0] pb-8 mb-12">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#A09D94] font-semibold mb-2">Finalization</p>
                    <h1 className="text-3xl lg:text-4xl font-serif">Checkout</h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Left Side: Address Selection (Single Column) */}
                    <div className="grow">
                        <div className="flex justify-between items-end mb-8 border-b border-[#DCD9D0]/50 pb-2">
                            <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#1C1C1C]">Shipping Destination</h2>
                            <button
                                onClick={() => navigate("/checkout-address?new=true")}
                                className="text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#1C1C1C] transition-colors border-b border-[#DCD9D0] hover:border-[#1C1C1C]"
                            >
                                + Add New Address
                            </button>
                        </div>

                        {addresses.length === 0 ? (
                            <div className="p-10 border border-dashed border-[#DCD9D0] text-center">
                                <p className="text-[11px] uppercase tracking-widest text-[#888888]">No saved addresses found.</p>
                            </div>
                        ) : (
                            // FIXED: grid-cols-1 ensures a single column layout
                            <div className="flex flex-col space-y-4 max-w-2xl">
                                {addresses.map((addr) => (
                                    <div 
                                        key={addr._id} 
                                        onClick={() => setSelectedAddress(addr)}
                                        className={`relative p-6 border transition-all duration-300 cursor-pointer ${
                                            selectedAddress?._id === addr._id 
                                            ? 'border-[#1C1C1C] bg-white shadow-sm' 
                                            : 'border-[#DCD9D0] bg-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-serif text-lg mb-2">{addr.fullName}</h3>
                                                <div className="text-[12px] leading-relaxed text-[#4A4A4A] space-y-1">
                                                    <p>{addr.addressLine}</p>
                                                    <p>{addr.city}, {addr.state} — {addr.pincode}</p>
                                                    <p className="pt-2 font-medium">📞 {addr.phone}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Selector indicator */}
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                                selectedAddress?._id === addr._id 
                                                ? 'border-[#1C1C1C] bg-[#1C1C1C]' 
                                                : 'border-[#DCD9D0]'
                                            }`}>
                                                {selectedAddress?._id === addr._id && (
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Side: Order Summary Sidebar */}
                    <aside className="w-full lg:w-96 shrink-0">
                        <div className="bg-white p-8 border border-[#DCD9D0] shadow-sm sticky top-24">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1C1C1C] mb-6 border-b border-[#DCD9D0] pb-4">
                                Review Manifest
                            </h3>

                            {validItems.length === 0 ? (
                                <p className="text-[10px] uppercase tracking-widest text-red-800">Your selection is empty.</p>
                            ) : (
                                <div className="space-y-6 mb-10 max-h-60 overflow-y-auto pr-2">
                                    {validItems.map((item) => (
                                        <div key={item.productId._id} className="flex justify-between items-start gap-4">
                                            <div className="grow">
                                                <h4 className="text-[11px] font-bold uppercase tracking-wider">{item.productId?.title}</h4>
                                                <p className="text-[10px] text-[#888888] mt-1">Quantity: {item.quantity}</p>
                                            </div>
                                            <span className="text-[11px] font-medium">TK {(item.productId?.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-3 mb-8 border-t border-[#DCD9D0] pt-6">
                                <div className="flex justify-between text-[11px] uppercase tracking-widest text-[#6B6B6B]">
                                    <span>Subtotal</span>
                                    <span>TK {total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] uppercase tracking-widest text-[#6B6B6B]">
                                    <span>Courier</span>
                                    <span className="text-[9px]">Complimentary</span>
                                </div>
                            </div>

                            <div className="border-t border-[#1C1C1C] pt-6 mb-10 flex justify-between items-baseline">
                                <span className="text-sm font-serif">Total Due</span>
                                <span className="text-xl font-bold">TK {total.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={placeOrder}
                                disabled={validItems.length === 0}
                                className="w-full bg-[#1C1C1C] text-[#FBFaf7] py-4 text-[11px] uppercase tracking-[0.25em] font-bold transition-all hover:bg-[#252525] disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
                            >
                                Place Order (COD)
                            </button>

                            <p className="mt-6 text-[9px] uppercase tracking-[0.2em] text-[#888888] text-center leading-loose">
                                By placing this order, you agree to our <br /> 
                                <span className="underline cursor-pointer">Terms of Service</span>
                            </p>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
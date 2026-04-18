import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import api from "../api/axios";

const CheckoutAddress = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(true);
    const isNewAddress = new URLSearchParams(location.search).get("new");

    useEffect(() => {
        const checkAddress = async () => {
            try {
                if (!userId) return;
                const res = await api.get(`/address/${userId}`);
                const addresses = res.data.addresses || [];

                if (addresses.length > 0 && !isNewAddress) {
                    navigate("/checkout");
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        checkAddress();
    }, [userId, isNewAddress]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const saveAddress = async () => {
        if (Object.values(form).some(value => value === "")) {
            alert("Please complete all fields in the registry.");
            return;
        }

        try {
            await api.post("/address/add", {
                ...form,
                userId
            });
            navigate("/checkout");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="h-screen bg-[#FBFaf7] flex items-center justify-center font-sans">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#888888] animate-pulse">
                    Preparing Registry...
                </p>
            </div>
        );
    }

    return (
        /* FIXED: h-[calc(100vh-80px)] and overflow-hidden on the root. */
        <div className="h-[calc(100vh-80px)] w-full bg-[#FBFaf7] text-[#1C1C1C] font-sans overflow-hidden flex flex-col selection:bg-[#1A261D] selection:text-[#FBFaf7]">
            
            <div className="grow flex items-center justify-center px-6 lg:px-20 overflow-hidden">
                <div className="max-w-2xl w-full flex flex-col overflow-hidden">
                    
                    {/* Header - Compact spacing */}
                    <header className="border-b border-[#DCD9D0] pb-4 mb-6 shrink-0">
                        <p className="text-[9px] uppercase tracking-[0.4em] text-[#A09D94] font-semibold mb-1">Registration</p>
                        <h1 className="text-2xl lg:text-3xl font-serif">Delivery Registry</h1>
                        <button 
                            onClick={() => navigate(-1)}
                            className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#888888] hover:text-[#1C1C1C] transition-colors"
                        >
                            ← Back
                        </button>
                    </header>

                    {/* Form Section - overflow-hidden to ensure NO SCROLLING */}
                    <div className="bg-white p-6 md:p-10 border border-[#DCD9D0] shadow-sm overflow-hidden shrink-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            
                            {[
                                { name: "fullName", label: "Full Name", type: "text", fullWidth: true },
                                { name: "phone", label: "Contact Number", type: "tel", fullWidth: false },
                                { name: "pincode", label: "Postal Code", type: "text", fullWidth: false },
                                { name: "addressLine", label: "Address Line", type: "text", fullWidth: true },
                                { name: "city", label: "City", type: "text", fullWidth: false },
                                { name: "state", label: "State / Province", type: "text", fullWidth: false },
                            ].map((field) => (
                                <div key={field.name} className={`${field.fullWidth ? 'md:col-span-2' : ''} flex flex-col`}>
                                    <label className="text-[8px] uppercase tracking-[0.3em] text-[#A09D94] font-bold mb-1">
                                        {field.label}
                                    </label>
                                    <input 
                                        type={field.type}
                                        name={field.name}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-0 border-b border-[#DCD9D0] py-1.5 text-sm focus:border-[#1C1C1C] transition-colors outline-none placeholder:text-transparent"
                                        autoComplete="off"
                                    />
                                </div>
                            ))}

                        </div>

                        <div className="mt-8">
                            <button
                                onClick={saveAddress}
                                className="w-full bg-[#1C1C1C] text-[#FBFaf7] py-3.5 text-[10px] uppercase tracking-[0.25em] font-bold transition-all hover:bg-[#252525] active:scale-[0.98]"
                            >
                                Confirm & Save Address
                            </button>
                            
                            <p className="mt-4 text-[8px] text-[#888888] text-center uppercase tracking-widest">
                                Secured by Private Concierge Network
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutAddress;
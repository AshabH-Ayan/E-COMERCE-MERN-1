import { useState } from "react";
import { useParams, useNavigate } from "react-router";

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const goHome = () => {
        navigate('/');
    };

    const copyToClipboard = () => {
        if (id) {
            navigator.clipboard.writeText(id);
            setCopied(true);
            // Reset "Copied" text after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        /* FIXED: Locked to viewport height, no scrolling */
        <div className="h-[calc(100vh-80px)] w-full bg-[#FBFaf7] flex items-center justify-center px-6 selection:bg-[#1A261D] selection:text-[#FBFaf7] overflow-hidden">
            
            <div className="max-w-lg w-full text-center">
                
                {/* Minimalist Success Icon */}
                <div className="mb-8">
                    <span className="text-4xl lg:text-5xl text-[#C5B595] inline-block opacity-80">
                        ❦
                    </span>
                </div>

                {/* Main Message */}
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#A09D94] font-semibold mb-4">
                    Transaction Confirmed
                </p>
                
                <h1 className="text-4xl lg:text-5xl font-serif text-[#1C1C1C] mb-6 leading-tight">
                    Gratitude for your <br /> selection.
                </h1>

                {/* Order Identification Box with Copy Option */}
                <div className="bg-white border border-[#DCD9D0] p-6 mb-10 shadow-sm relative group">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#888888] mb-2">
                        Manifest Reference
                    </p>
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-sm font-mono tracking-widest text-[#1C1C1C]">
                            {id}
                        </p>
                        
                        {/* Copy Button - Minimalist text style */}
                        <button 
                            onClick={copyToClipboard}
                            className="text-[9px] uppercase tracking-[0.2em] text-[#C5B595] hover:text-[#1C1C1C] transition-colors duration-300"
                        >
                            {copied ? "Reference Copied" : "Copy Reference"}
                        </button>
                    </div>
                </div>

                {/* Supporting Text */}
                <p className="text-sm text-[#6B6B6B] leading-relaxed font-light mb-12 px-4">
                    A formal confirmation has been dispatched to your registered electronic mail. Our private couriers are now preparing your garments for transit.
                </p>

                {/* Return Action */}
                <button
                    onClick={goHome}
                    className="group relative inline-flex flex-col items-center"
                >
                    <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#1C1C1C] pb-1">
                        Return to Archive
                    </span>
                    {/* Animated Underline */}
                    <div className="w-8 h-px bg-[#C5B595] transition-all duration-500 group-hover:w-full"></div>
                </button>

                {/* Bottom Branding */}
                <div className="mt-20 opacity-30">
                    <p className="text-[8px] uppercase tracking-[0.4em] text-[#1C1C1C]">
                        Riviera — Maison De Couture
                    </p>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;
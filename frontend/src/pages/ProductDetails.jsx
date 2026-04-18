import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useParams, useNavigate } from 'react-router'

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');

  const loadProduct = async () => {
    const res = await api.get(`/products/`);
    const p = res.data.find((item) => item._id === id);
    setProduct(p);
  }

  useEffect(() => {
    loadProduct();
  }, [id]);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }

    const res = await api.post("/cart/add", {
      userId,
      productId: product._id,
    });

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!product) {
    return (
      <div className="h-screen bg-[#FBFaf7] flex items-center justify-center font-sans">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#888888] animate-pulse">
          Retrieving Garment...
        </p>
      </div>
    );
  }

  return (
    /* h-[calc(100vh-80px)] prevents scrolling.
       px-6 sm:px-12 lg:px-20 keeps the left/right margins.
    */
    <div className="bg-[#FBFaf7] h-[calc(100vh-80px)] w-full px-6 sm:px-12 lg:px-20 text-[#1C1C1C] font-sans overflow-hidden flex flex-col selection:bg-[#1A261D] selection:text-[#FBFaf7]">
      
      {/* Return Button Area */}
      <div className="w-full py-6 shrink-0 border-b border-[#EAE6DF]/30">
        <div className="max-w-350">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center text-[10px] uppercase tracking-[0.25em] font-semibold text-[#888888] hover:text-[#1C1C1C] transition-colors"
          >
            <span className="mr-3 text-lg transform group-hover:-translate-x-1 transition-transform">←</span>
            Return to Archive
          </button>
        </div>
      </div>

      {/* Main Content: Split Screen area 
          Added pb-10 to ensure the grey box isn't attached to the bottom of the screen.
      */}
      <div className="grow flex flex-col lg:flex-row w-full max-w-400 overflow-hidden pb-10 pt-6">
        
        {/* Left Side: Image Area with the Grey Background 
            h-full ensures it takes up the available space while respecting the parent's padding.
        */}
        <div className="w-full lg:w-[55%] h-full bg-[#F2F1EC] flex items-center justify-center p-12 lg:p-20 overflow-hidden shadow-sm">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-[2s] hover:scale-105"
          />
        </div>

        {/* Right Side: Details Area */}
        <div className="w-full lg:w-[45%] h-full flex flex-col justify-center lg:pl-20 py-4 overflow-y-auto">
          
          <div className="max-w-md">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#A09D94] font-semibold mb-3">
              Maison De Couture
            </p>

            <h1 className="text-3xl lg:text-5xl font-serif leading-tight text-[#1C1C1C] mb-4">
              {product.title}
            </h1>
            
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B6B6B] font-medium mb-6">
              TK {product.price}
            </p>

            <div className="w-12 h-px bg-[#DCD9D0] mb-8"></div>
            
            <p className="text-sm text-[#4A4A4A] leading-relaxed font-light mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1C1C1C] mb-4">Size</span>
              <div className="flex gap-3">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 flex items-center justify-center text-[10px] font-medium transition-all ${
                      selectedSize === size 
                        ? 'bg-[#1C1C1C] text-white' 
                        : 'border border-[#DCD9D0] text-[#1C1C1C] hover:border-[#1C1C1C]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Final Action Button */}
            <button
              onClick={addToCart}
              className="group flex items-center justify-between w-full bg-[#1C1C1C] text-[#FBFaf7] px-8 py-4 transition-all hover:bg-[#252525]"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">Add to Bag</span>
              <div className="w-7 h-7 flex items-center justify-center bg-[#FBFaf7] rounded-full text-[#1C1C1C] transition-transform group-hover:scale-110">
                <span className="text-xl font-bold leading-none -translate-y-[0.5px]">+</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const loadProducts = async () => {
    const res = await api.get(`/products?search=${search}&category=${category}`);
    setProducts(res.data);
  }

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId || userId === "undefined") {
      alert("Please login first");
      return;
    }

    try {
      await api.post('/cart/add', {
        userId,
        productId,
        quantity: 1
      });

      // ✅ IMPORTANT: wait a tiny bit to ensure DB updated
      setTimeout(() => {
        window.dispatchEvent(new Event('cartUpdated'));
      }, 100);

    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
    }
  };

  return (
    // Base Palette: Matches the exact ivory/dark aesthetic of your Signup page
    <div className="bg-[#FBFaf7] min-h-screen text-[#1C1C1C] font-sans selection:bg-[#1A261D] selection:text-[#FBFaf7]">
      
      {/* Cinematic Hero Section: The Private Study / Library */}
      <section className="relative w-full h-[65vh] lg:h-[75vh] overflow-hidden bg-[#111]">
        <img 
          // UPDATED HERO IMAGE: The classic, moody library aesthetic (Pure Old Money)
          src="https://images.unsplash.com/photo-1710505736784-0708d6e58bc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG9sZCUyMG1vbmV5fGVufDB8fDB8fHww" 
          alt="Riviera Heritage Study" 
          className="absolute inset-0 w-full h-full object-cover contrast-125 brightness-50 sepia-[.2]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0f0c] via-[#1A261D]/40 to-transparent mix-blend-multiply"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mt-20">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium text-[#C5B595] mb-4">
            Maison De Couture
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-[#EBE6D9] uppercase tracking-[0.2em] drop-shadow-md">
            The Heritage
          </h1>
          <div className="w-px h-12 bg-[#C5B595] mx-auto mt-8 opacity-60"></div>
        </div>
      </section>

      {/* Main Archive Section */}
      <main className="max-w-325 mx-auto px-6 sm:px-12 py-16 md:py-24">
        
        {/* Editorial Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 pb-6 border-b border-[#DCD9D0]">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif tracking-wide text-[#1C1C1C]">Curated Garments</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search archive..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#CCCCCC] px-0 py-2 text-[11px] uppercase tracking-[0.15em] text-[#1C1C1C] placeholder-[#999999] focus:border-[#1C1C1C] focus:ring-0 transition-colors outline-none"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative w-full sm:w-56">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#CCCCCC] px-0 py-2 text-[11px] uppercase tracking-[0.15em] text-[#1C1C1C] focus:border-[#1C1C1C] focus:ring-0 transition-colors outline-none cursor-pointer appearance-none"
              >
                <option value="">The Complete Archive</option>
                <option value="polos">polos</option>
                <option value="Shirts">shirts</option>
                <option value="Pants">pants</option>
                <option value="Sweaters">sweaters</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-[#1C1C1C]">▼</div>
            </div>

          </div>
        </div>

        {/* Products Grid - Featuring your exact requested Product Card UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12">
          {products.map((product) => (
            <article key={product._id} className="group relative flex flex-col">
              
              {/* Image Container with Floating Bar */}
              <div className="relative w-full aspect-4/5 overflow-hidden bg-[#F2F1EC] mb-4">
                
                <Link to={`/product/${product._id}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                </Link>

                {/* THE BOX UI: Glassmorphism Floating Bar based exactly on your screenshot */}
                <div className="absolute bottom-4 left-4 right-4 h-14 bg-white/60 backdrop-blur-md rounded-xl flex items-center justify-between px-5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto shadow-lg border border-white/40">
                  
                  {/* Hard-coded sizes */}
                  <div className="flex items-center space-x-4 text-sm text-black font-sans font-medium">
                    <span>S</span>
                    <span>M</span>
                  </div>
                  
                  {/* Add Button: Pill shape with inner circular plus icon */}
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the link wrapper from firing
                      addToCart(product._id);
                    }}
                    className="flex items-center bg-black rounded-full text-white pl-4 pr-1.5 py-1.5 space-x-2 transition hover:bg-gray-800"
                  >
                    <span className="font-sans text-sm font-medium">Add</span>
                    <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full text-black">
                      <span className="text-lg font-bold leading-none -translate-y-px">+</span>
                    </div>
                  </button>

                </div>
              </div>

              {/* Product Info below the image */}
              <div className="flex flex-col items-start px-1">
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-serif text-[16px] text-[#1C1C1C] leading-snug group-hover:text-[#6B6B6B] transition-colors duration-300 line-clamp-1">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#888888] mt-2">
                  TK {product.price}
                </p>
              </div>

            </article>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-2xl text-[#C5B595] mb-4">❦</span>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#888888]">
              No garments found matching your criteria.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}

export default Home;
import { useState } from 'react';  
import { useNavigate } from 'react-router';
import api from '../api/axios';

function Login() {  
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await api.post('/auth/login', form);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.user.id);
          setMsg("Login successful! Redirecting...");

          //redirect to homepage after 1 sec
          setTimeout(() => {
            navigate('/');
          }, 1000);

        } catch (error) {
          setMsg(error.response?.data?.message || "An error occurred.");
        }
    }
  
  return(
    // fixed inset-0 z-50 locks the screen, removing all scrollbars and covering global navbars
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-[#FBFaf7] font-sans text-[#1C1C1C] selection:bg-[#1A261D] selection:text-[#FBFaf7]">
      
      {/* Editorial Image Section: Classic Tailoring / Old Money Aesthetic */}
      <div className="hidden lg:block lg:w-[45%] relative h-full bg-[#111]">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop"
          alt="Riviera Heritage Craftsmanship"
          className="absolute inset-0 w-full h-full object-cover contrast-125 brightness-[0.45] sepia-[.3] grayscale-[.2]"
        />
        {/* A deep, rich overlay to make the image feel like a matte vintage print */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0f0c] via-[#1A261D]/30 to-transparent mix-blend-multiply"></div>
        
        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center justify-center text-[#F9F8F5] text-center">
          <h1 className="text-5xl font-serif tracking-[0.25em] uppercase mb-4 ml-4 text-[#EBE6D9]">Riviera</h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C5B595]">Welcome Back</p>
          <p className="text-[8px] tracking-[0.3em] uppercase text-[#888] mt-2">Maison De Couture</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-[55%] h-full flex flex-col items-center justify-center relative p-8 sm:p-12">
        
        {/* Back Button (Top Left) */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-10 left-10 flex items-center gap-2 text-[12px] tracking-wide text-[#1C1C1C] hover:text-[#6B6B6B] transition-colors"
        >
          <span>&larr;</span> Back to Shop
        </button>

        <div className="w-full max-w-105">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-serif text-[#1C1C1C] tracking-wide mb-3">
              Client Login
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
              Access your Riviera account
            </p>
          </div>

          {/* Error / Success Message Box */}
          <div className="min-h-12 mb-8 flex items-center justify-center">
            {msg && (
              <div className="w-full py-3 px-4 flex justify-between items-center border border-[#DCD3B6] bg-[#F3EFE6] text-[#5A4F35] text-[11px] tracking-widest uppercase shadow-sm">
                <span>{msg}</span>
                <button type="button" onClick={() => setMsg("")} className="text-[#5A4F35] hover:text-black text-lg leading-none transition-colors">&times;</button>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4A4A4A] mb-2">
                Email Address
              </label>
              <input
                name='email'
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#DCD9D0] focus:border-[#1A261D] focus:ring-0 transition-colors duration-300 text-[#1C1C1C] outline-none text-sm rounded-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4A4A4A] mb-2 flex justify-between items-center">
                <span>Password</span>
                <span className="text-[#888] tracking-normal capitalize text-[9px] hover:text-[#1A261D] cursor-pointer transition-colors font-medium">Forgot?</span>
              </label>
              <input
                name='password'
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-0 py-2 bg-transparent border-0 border-b border-[#DCD9D0] focus:border-[#1A261D] focus:ring-0 transition-colors duration-300 text-[#1C1C1C] outline-none text-sm rounded-none tracking-widest"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A261D] text-[#DCD3B6] py-4 mt-6 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-[#0a0f0c] transition-all duration-300 rounded-none shadow-sm"
            >
              Sign In
            </button>
            
            {/* Signup Link */}
            <div className="text-center mt-8">
              <p className="text-[12px] text-[#4A4A4A]">
                New to Riviera?{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-[#1A261D] font-medium hover:text-[#6B6B6B] transition-colors inline-flex items-center gap-1"
                >
                  &rarr; Create Account
                </button>
              </p>
            </div>

          </form>
          
        </div>
      </div>
    </div>
  )
};

export default Login;
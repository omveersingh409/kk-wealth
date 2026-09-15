import { useState, useEffect, useRef } from 'react';
import { Menu, X, LogOut, ChevronDown, User as UserIcon, ShoppingBag } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = user?.role === 'admin';
  const isLogged = !!user;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    // Close mobile menu if open
    setIsOpen(false);
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const baseLinkClass = "text-text-muted hover:text-white font-medium transition-colors";
  const getLinkClass = (path) => `${baseLinkClass} ${isActive(path) ? 'text-white' : ''}`;
  const mobileLinkClass = "block px-3 py-3 text-text-muted hover:text-white hover:bg-navy-800/50 rounded-lg";

  return (
    <nav className="fixed w-full z-50 bg-navy-900/90 backdrop-blur-lg border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-white tracking-tight">KK</span>
              <span className="text-2xl font-bold gradient-text pb-0.5">Wealth</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            {!isLogged && !isAdmin && (
              <>
                <Link to="/" className={getLinkClass('/')}>Home</Link>
                <Link to="/advisory" className={getLinkClass('/advisory')}>Equity Advisory</Link>
                <Link to="/classes" className={getLinkClass('/classes')}>Online Class</Link>
              </>
            )}

            {isLogged && !isAdmin && (
              <>
                <Link to="/" className={getLinkClass('/')}>Home</Link>
                <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
                <Link to="/my-subscription" className={getLinkClass('/my-subscription')}>My Subscription</Link>
                <Link to="/advisory-calls" className={getLinkClass('/advisory-calls')}>Advisory Calls</Link>
                <Link to="/my-course" className={getLinkClass('/my-course')}>My Course</Link>
                <Link to="/payment-history" className={getLinkClass('/payment-history')}>Payment History</Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link to="/" className={getLinkClass('/')}>Home</Link>
                <Link to="/admin" className="text-brand-blue hover:text-blue-400 font-bold transition-colors">Admin Dashboard</Link>
              </>
            )}
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            {!isLogged ? (
              <>
                <Link to="/login" className="text-text-muted hover:text-white font-medium transition-colors px-2">
                  Login
                </Link>
                <Link to="/register" className="bg-brand-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-brand-blue/20">
                  Register
                </Link>
              </>
            ) : isAdmin ? (
              <button onClick={handleLogout} className="flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 hover:bg-brand-red hover:border-brand-red hover:text-white text-brand-red px-5 py-2.5 rounded-lg font-medium transition-all">
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <ProfileDropdown user={user} handleLogout={handleLogout} />
            )}
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {isLogged && !isAdmin && (
              <ProfileDropdown user={user} handleLogout={handleLogout} />
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-muted hover:text-white p-2">
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-navy-900 border-b border-navy-800 shadow-xl overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="px-4 pt-2 pb-6 flex flex-col space-y-1">
            {!isLogged && !isAdmin && (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Home</Link>
                <Link to="/advisory" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Equity Advisory</Link>
                <Link to="/classes" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Online Class</Link>
              </>
            )}

            {isLogged && !isAdmin && (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Home</Link>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Dashboard</Link>
                <Link to="/my-subscription" onClick={() => setIsOpen(false)} className={mobileLinkClass}>My Subscription</Link>
                <Link to="/advisory-calls" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Advisory Calls</Link>
                <Link to="/my-course" onClick={() => setIsOpen(false)} className={mobileLinkClass}>My Course</Link>
                <Link to="/payment-history" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Payment History</Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass}>Home</Link>
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-brand-blue hover:bg-navy-800/50 rounded-lg font-bold">Admin Dashboard</Link>
              </>
            )}

            <div className="mt-6 flex flex-col gap-3 px-3 border-t border-navy-800 pt-6">
              {!isLogged ? (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 border border-navy-700 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-3 bg-brand-blue hover:bg-blue-600 transition-colors text-white rounded-lg font-medium shadow-lg shadow-brand-blue/20">Register</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-center py-3 bg-brand-red/10 border border-brand-red/30 hover:bg-brand-red text-brand-red hover:text-white transition-colors rounded-lg font-medium">
                  <LogOut size={18} /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function ProfileDropdown({ user, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-navy-800 p-1.5 rounded-full pl-2 pr-3 transition-colors border border-transparent hover:border-navy-700"
      >
        <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold shadow-lg shadow-brand-blue/20">
          {initial}
        </div>
        <ChevronDown size={16} className={`text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-navy-800 border border-navy-700 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="py-2">
            <Link 
              to="/profile" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-text-muted hover:text-white hover:bg-navy-700/50 transition-colors"
            >
              <UserIcon size={18} />
              <span className="font-medium">My Profile</span>
            </Link>
            
            <div className="my-1 border-t border-navy-700/80"></div>
            
            <button 
              onClick={() => { setIsOpen(false); handleLogout(); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-brand-red hover:text-red-400 hover:bg-navy-700/50 transition-colors text-left"
            >
              <LogOut size={18} />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

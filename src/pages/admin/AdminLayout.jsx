import { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, PhoneCall, BookOpen, CreditCard, Settings, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Advisory Calls', path: '/admin/calls', icon: <PhoneCall size={20} /> },
    { name: 'Courses', path: '/admin/courses', icon: <BookOpen size={20} /> },
    { name: 'Payments', path: '/admin/payments', icon: <CreditCard size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex h-screen bg-[#07101E] overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-navy-900/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-800 border-r border-navy-700 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-navy-700 bg-navy-900/50">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">KK</span>
              <span className="text-2xl font-bold text-brand-blue">Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="text-text-muted hover:text-white p-1 lg:hidden">
              <X size={24} />
            </button>
          </div>
          
          <div className="p-5 border-b border-navy-700 text-sm flex items-center gap-4 bg-navy-800/80">
             <div className="w-12 h-12 bg-brand-green/20 text-brand-green flex items-center justify-center rounded-xl font-bold text-xl border border-brand-green/20">
               A
             </div>
             <div>
               <p className="text-white font-bold">Administrator</p>
               <p className="text-text-muted text-xs">Owner Account</p>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-2 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                      : 'text-text-muted hover:text-white hover:bg-navy-700'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="p-4 border-t border-navy-700 mt-auto bg-navy-900/30">
            <button 
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/';
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-navy-700 hover:text-white rounded-lg transition-colors font-medium cursor-pointer"
            >
              <LogOut size={20} />
              Exit Admin Panel
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto w-full">
        <div className="sticky top-0 bg-[#07101E]/90 backdrop-blur-md border-b border-navy-700 p-4 z-30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="text-text-muted hover:text-white p-2 bg-navy-800 rounded-lg border border-navy-700 lg:hidden">
              <Menu size={20} />
            </button>
            <span className="font-bold text-white text-lg hidden sm:block">Control Panel / <span className="text-brand-blue font-medium">{location.pathname.split('/').pop() || 'overview'}</span></span>
          </div>
          <div className="flex items-center gap-4 text-sm text-text-muted">
            Admin v1.0.0
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

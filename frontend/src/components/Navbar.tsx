import React from 'react';
import { MessageSquare, Bell, Search, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  user: any;
  onLoginClick: () => void;
  onLogout: () => void;
  search: string;
  onSearchChange: (val: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onLogout, search, onSearchChange }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between">
    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
      <MessageSquare className="fill-indigo-600" />
      <span>ModernBBS</span>
    </Link>
    <div className="flex-1 max-w-md mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search topics..." 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
        />
      </div>
    </div>
    <div className="flex items-center gap-4 text-gray-600">
      {user ? (
        <>
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={22} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
          <Link to={`/profile/${user.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex flex-col items-end">
              <span className="font-bold text-sm text-gray-900">{user.username}</span>
              <span className="text-[10px] text-amber-500 font-black uppercase">Level {user.level || 1}</span>
            </div>
          </Link>
          <button onClick={onLogout} className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors" title="Logout">
            <LogOut size={20} />
          </button>
        </>
      ) : (
        <button 
          onClick={onLoginClick}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <LogIn size={18} />
          Login
        </button>
      )}
    </div>
  </nav>
);

export default Navbar;

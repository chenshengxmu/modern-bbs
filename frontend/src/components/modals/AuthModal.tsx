import React from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
  isRegistering: boolean;
  setIsRegistering: (val: boolean) => void;
  authData: any;
  setAuthData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  show, onClose, isRegistering, setIsRegistering, authData, setAuthData, onSubmit, isPending 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-indigo-900/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-8 rounded-[40px] shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
          <X size={20} />
        </button>
        <h2 className="text-3xl font-black mb-2">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="text-gray-500 mb-8 font-medium">
          {isRegistering ? 'Join our community today' : 'Log in to interact with the community'}
        </p>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 ml-4">Username</label>
            <input 
              type="text" 
              value={authData.username}
              onChange={e => setAuthData({...authData, username: e.target.value})}
              className="w-full bg-gray-50 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium transition-all" 
              placeholder="Choose a username" 
              required
            />
          </div>

          {isRegistering && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 ml-4">Email Address</label>
              <input 
                type="email" 
                value={authData.email}
                onChange={e => setAuthData({...authData, email: e.target.value})}
                className="w-full bg-gray-50 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium transition-all" 
                placeholder="name@example.com" 
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 ml-4">Password</label>
            <input 
              type="password" 
              value={authData.password}
              onChange={e => setAuthData({...authData, password: e.target.value})}
              className="w-full bg-gray-50 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium transition-all" 
              placeholder="••••••••" 
              required
            />
          </div>

          <button 
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50 mt-4"
          >
            {isPending ? 'Processing...' : (isRegistering ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 font-medium">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="ml-2 text-indigo-600 font-bold hover:underline"
            >
              {isRegistering ? 'Sign In' : 'Create One'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

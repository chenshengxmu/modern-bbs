import React from 'react';
import { LayoutGrid, PlusCircle } from 'lucide-react';

interface SidebarProps {
  boards: any[];
  selectedBoardId?: string;
  onBoardSelect: (id: string | undefined) => void;
  onCreatePostClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ boards, selectedBoardId, onBoardSelect, onCreatePostClick }) => (
  <aside className="w-64 shrink-0 space-y-6">
    <div>
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">Boards</h2>
      <div className="space-y-1">
        <button 
          onClick={() => onBoardSelect(undefined)}
          className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${!selectedBoardId ? 'bg-white shadow-lg shadow-indigo-500/5' : 'hover:bg-white hover:shadow-lg hover:shadow-indigo-500/5'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-colors ${!selectedBoardId ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}`}>
              <LayoutGrid size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">All Topics</h3>
              <p className="text-xs text-gray-500">Everything at once</p>
            </div>
          </div>
        </button>
        {boards?.map((board: any) => (
          <button 
            key={board.id} 
            onClick={() => onBoardSelect(board.id)}
            className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${selectedBoardId === board.id ? 'bg-white shadow-lg shadow-indigo-500/5' : 'hover:bg-white hover:shadow-lg hover:shadow-indigo-500/5'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${selectedBoardId === board.id ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                <LayoutGrid size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{board.name}</h3>
                <p className="text-xs text-gray-500">{board.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
    
    <div className="p-4 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
        <PlusCircle size={80} />
      </div>
      <div className="relative z-10">
        <h3 className="font-bold text-lg mb-1">Create Thread</h3>
        <p className="text-xs text-indigo-100 mb-5">Share your thoughts with the community</p>
        <button 
          onClick={onCreatePostClick}
          className="w-full bg-white text-indigo-600 font-bold py-3 rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
        >
          New Post
        </button>
      </div>
    </div>
  </aside>
);

export default Sidebar;

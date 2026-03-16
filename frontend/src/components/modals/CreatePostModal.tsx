import React from 'react';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface CreatePostModalProps {
  show: boolean;
  onClose: () => void;
  boards: any[];
  postData: any;
  setPostData: (data: any) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  show, onClose, boards, postData, setPostData, onImageUpload, isUploading, onSubmit, isPending
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-indigo-900/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl p-8 rounded-[40px] shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
          <X size={20} />
        </button>
        <h2 className="text-3xl font-black mb-8">Create Post</h2>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 ml-4 uppercase tracking-widest">Select Board</label>
            <select 
              value={postData.boardId}
              onChange={e => setPostData({...postData, boardId: e.target.value})}
              className="w-full bg-gray-50 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium transition-all cursor-pointer text-gray-900"
              required
            >
              <option value="" className="text-gray-400">Select a board</option>
              {boards?.map((b: any) => (
                <option key={b.id} value={b.id} className="text-gray-900">
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 ml-4 uppercase tracking-widest">Title</label>
            <input 
              type="text" 
              value={postData.title}
              onChange={e => setPostData({...postData, title: e.target.value})}
              className="w-full bg-gray-50 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium transition-all" 
              placeholder="What's on your mind?" 
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 ml-4 uppercase tracking-widest">Content</label>
            <div className="relative">
              <textarea 
                rows={6}
                value={postData.content}
                onChange={e => setPostData({...postData, content: e.target.value})}
                className="w-full bg-gray-50 border-none px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium transition-all resize-none" 
                placeholder="Express your thoughts..." 
                required
              />
              <div className="absolute bottom-4 right-4">
                <label className="cursor-pointer p-3 bg-white text-indigo-600 rounded-2xl shadow-lg hover:bg-indigo-50 transition-all border border-indigo-50 flex items-center gap-2 group active:scale-95">
                  <input type="file" className="hidden" accept="image/*" onChange={onImageUpload} disabled={isUploading} />
                  {isUploading ? <Loader2 className="animate-spin" size={20} /> : <ImageIcon size={20} />}
                  <span className="text-xs font-bold">Add Image</span>
                </label>
              </div>
            </div>
          </div>
          <button 
            type="submit"
            disabled={isPending || isUploading}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50"
          >
            {isPending ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;

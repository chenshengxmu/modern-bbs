import React from 'react';
import { ThumbsUp, MessageSquare, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: any;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-50 group cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-500">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">{post.board?.name}</span>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
        <Award size={14} />
        Lv.{post.author?.level || 1}
      </div>
    </div>
    <Link to={`/post/${post.id}`}>
      <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
        {post.title}
      </h2>
    </Link>
    <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
      {post.content}
    </p>
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
      <Link to={`/profile/${post.author?.username}`} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
        <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center overflow-hidden text-[10px] font-bold">
          {post.author?.username?.substring(0, 2).toUpperCase()}
        </div>
        <span className="text-sm font-medium">{post.author?.username}</span>
      </Link>
      <div className="flex items-center gap-4 text-gray-400">
        <div className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <ThumbsUp size={16} />
          <span className="text-xs font-medium">{post.likeCount}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <MessageSquare size={16} />
          <span className="text-xs font-medium">{post.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PostCard;

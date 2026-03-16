import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, ThumbsUp, User, Award, ArrowLeft, Eye, Calendar, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { fetchPostById, addComment, toggleLikePost } from '../api';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: () => toggleLikePost(id!),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      toast.success(data.liked ? 'Liked!' : 'Like removed');
    },
    onError: () => toast.error('Failed to update like')
  });

  const commentMutation = useMutation({
    mutationFn: (content: string) => addComment(id!, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      setCommentContent('');
      toast.success('Comment added! +2 points');
    },
    onError: () => toast.error('Failed to add comment')
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to comment');
    if (!commentContent.trim()) return;
    commentMutation.mutate(commentContent);
  };

  // Helper to render content with images
  const renderContent = (content: string) => {
    const parts = content.split(/(!\[image\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/!\[image\]\((.*?)\)/);
      if (match) {
        const imageUrl = match[1];
        return (
          <div key={index} className="my-6 rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-indigo-500/5">
            <img src={imageUrl} alt="Uploaded content" className="w-full h-auto object-cover max-h-[600px]" />
          </div>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  if (isLoading) return <div className="p-20 text-center animate-pulse">Loading post...</div>;
  if (error || !post) return <div className="p-20 text-center text-red-500">Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-bold text-sm"
          >
            <ArrowLeft size={18} />
            Back to Feed
          </button>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {post.board?.name}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2 space-y-8">
          {/* Main Post Card */}
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                <Calendar size={14} />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <Eye size={14} />
                {post.viewCount} Views
              </div>
            </div>

            <h1 className="text-4xl font-black text-gray-900 mb-8 leading-tight">{post.title}</h1>
            <div className="prose prose-indigo max-w-none">
              <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                {renderContent(post.content)}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 flex items-center gap-6">
              <button 
                onClick={() => user ? likeMutation.mutate() : toast.error('Please login to like')}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold active:scale-95 bg-gray-50 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 ${
                  likeMutation.isPending ? 'opacity-50' : ''
                }`}
              >
                <ThumbsUp size={20} />
                <span>{post.likeCount} Likes</span>
              </button>
              <div className="flex items-center gap-2 text-gray-400 font-bold">
                <MessageSquare size={20} />
                <span>{post.comments?.length || 0} Comments</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <section className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900 ml-4">Discussion</h3>
            
            {/* Comment Form */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
              <form onSubmit={handleCommentSubmit} className="relative">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder={user ? "Write a comment..." : "Login to join the discussion"}
                  disabled={!user || commentMutation.isPending}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 pr-16 focus:ring-2 focus:ring-indigo-100 outline-none font-medium resize-none min-h-[100px]"
                />
                <button 
                  type="submit"
                  disabled={!user || !commentContent.trim() || commentMutation.isPending}
                  className="absolute bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-30 disabled:bg-gray-400"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>

            {/* Comment List */}
            <div className="space-y-4">
              {post.comments?.map((comment: any) => (
                <div key={comment.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold overflow-hidden text-[10px]">
                        {comment.author?.username?.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{comment.author?.username}</div>
                        <div className="text-[10px] font-black text-amber-500 uppercase tracking-wider">Level {comment.author?.level || 1}</div>
                      </div>
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed ml-1">{comment.content}</p>
                </div>
              ))}
              {(!post.comments || post.comments.length === 0) && (
                <div className="text-center py-12 text-gray-400 font-medium italic">No comments yet. Be the first!</div>
              )}
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center sticky top-28">
            <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-[32px] mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              {post.author?.avatarUrl ? <img src={post.author.avatarUrl} className="w-full h-full object-cover" /> : <User size={40} />}
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-1">{post.author?.username}</h3>
            <div className="inline-flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 px-3 py-1.5 rounded-xl mb-6">
              <Award size={14} />
              LEVEL {post.author?.level}
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
              <div>
                <div className="text-2xl font-black text-gray-900">{post.author?.points}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Points</div>
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">1</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Posts</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PostDetail;

import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../api';
import { 
  Award, 
  Calendar, 
  MessageSquare, 
  ThumbsUp, 
  ArrowLeft, 
  Loader2, 
  LayoutGrid,
  TrendingUp
} from 'lucide-react';

const Profile = () => {
  const { username } = useParams<{ username: string }>();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['userProfile', username],
    queryFn: () => fetchUserProfile(username!),
    enabled: !!username
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
        <p className="text-gray-500 mb-6">The user you are looking for does not exist.</p>
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold hover:underline">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Header / Cover Space */}
      <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

      <main className="max-w-5xl mx-auto px-6">
        {/* Profile Card */}
        <div className="relative -mt-24 bg-white rounded-[40px] shadow-xl shadow-indigo-100/50 p-8 mb-8 border border-white">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
            {/* Avatar */}
            <div className="w-40 h-40 bg-white p-2 rounded-[48px] shadow-lg">
              <div className="w-full h-full bg-indigo-50 rounded-[40px] flex items-center justify-center text-indigo-600 text-5xl font-black">
                {user.username.substring(0, 2).toUpperCase()}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left pb-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-gray-900">{user.username}</h1>
                <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-xl text-sm font-black uppercase">
                  <Award size={16} />
                  Level {user.level}
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar size={18} className="text-gray-400" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={18} className="text-gray-400" />
                  <span>{user.points} Points</span>
                </div>
              </div>
            </div>

            <Link to="/" className="md:mb-4 p-3 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
              <ArrowLeft size={24} />
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-50">
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900">{user._count.posts}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Posts</div>
            </div>
            <div className="text-center border-x border-gray-50">
              <div className="text-2xl font-black text-gray-900">{user.totalLikesReceived}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900">{user._count.comments}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Comments</div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 px-2">
              <LayoutGrid className="text-indigo-600" />
              Recent Posts
            </h2>

            {user.posts.length > 0 ? (
              <div className="space-y-4">
                {user.posts.map((post: any) => (
                  <Link 
                    key={post.id} 
                    to={`/post/${post.id}`}
                    className="block bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-tight">
                        {post.board.name}
                      </span>
                      <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <ThumbsUp size={14} />
                        {post.likeCount}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <MessageSquare size={14} />
                        {post._count.comments}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={32} />
                </div>
                <p className="text-gray-400 font-medium">No posts yet.</p>
              </div>
            )}
          </div>

          {/* Sidebar / Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">About {user.username}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                A dedicated member of ModernBBS community, currently at Level {user.level} with {user.points} points.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

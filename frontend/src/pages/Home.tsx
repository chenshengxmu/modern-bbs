import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import { fetchLeaderboard } from '../api';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import AuthModal from '../components/modals/AuthModal';
import CreatePostModal from '../components/modals/CreatePostModal';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import { useUpload } from '../hooks/useUpload';

export default function Home() {
  const auth = useAuth();
  const postsState = usePosts();
  const { isUploading, handleImageUpload } = useUpload();
  
  const { data: leaderboard, isLoading: leaderboardLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard
  });

  const handleImageUploadSuccess = (url: string) => {
    postsState.setPostData(prev => ({ ...prev, content: prev.content + `\n![image](${url})\n` }));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans selection:bg-indigo-100">
      <Navbar 
        user={auth.user} 
        onLoginClick={() => { auth.setShowLogin(true); auth.setIsRegistering(false); }} 
        onLogout={auth.handleLogout}
        search={postsState.search}
        onSearchChange={postsState.setSearch}
      />
      <main className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        <Sidebar 
          boards={postsState.boards || []}
          selectedBoardId={postsState.selectedBoardId}
          onBoardSelect={postsState.setSelectedBoardId}
          onCreatePostClick={() => auth.user ? postsState.setShowCreatePost(true) : auth.setShowLogin(true)}
        />
        <section className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-black text-gray-900">
              {postsState.selectedBoardId ? postsState.boards?.find((b: any) => b.id === postsState.selectedBoardId)?.name : 'Recent Activity'}
            </h1>
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
              <button className="px-5 py-1.5 text-sm font-bold bg-white shadow-sm rounded-lg text-indigo-600">Hot</button>
              <button className="px-5 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">New</button>
            </div>
          </div>
          {postsState.postsLoading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {postsState.posts && postsState.posts.length > 0 ? (
                postsState.posts.map((post: any) => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                  <p className="text-gray-400 font-bold text-lg">No posts found in this board.</p>
                </div>
              )}
            </div>
          )}
        </section>

        <aside className="w-80 shrink-0 hidden lg:block space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Award className="text-amber-500" /> Top Contributors
            </h2>
            <div className="space-y-5">
              {leaderboardLoading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-100 rounded-full w-24"></div>
                      <div className="h-2 bg-gray-100 rounded-full w-16"></div>
                    </div>
                  </div>
                ))
              ) : (
                leaderboard?.slice(0, 5).map((u: any, index: number) => (
                  <Link key={u.id} to={`/profile/${u.username}`} className="flex items-center gap-4 group cursor-pointer">
                    <div className={`w-10 h-10 ${index === 0 ? 'bg-amber-100 text-amber-600' : index === 1 ? 'bg-gray-100 text-gray-600' : index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-indigo-50 text-indigo-600'} rounded-full flex items-center justify-center font-black text-sm`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">{u.username}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Level {u.level || 1} • {u.points || 0} pts</div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </aside>
      </main>

      <AuthModal 
        show={auth.showLogin} onClose={() => auth.setShowLogin(false)}
        isRegistering={auth.isRegistering} setIsRegistering={auth.setIsRegistering}
        authData={auth.authData} setAuthData={auth.setAuthData}
        onSubmit={(e) => { e.preventDefault(); auth.authMutation.mutate(auth.authData); }}
        isPending={auth.authMutation.isPending}
      />
      <CreatePostModal 
        show={postsState.showCreatePost} onClose={() => postsState.setShowCreatePost(false)}
        boards={postsState.boards || []} postData={postsState.postData} setPostData={postsState.setPostData}
        onImageUpload={(e) => handleImageUpload(e, handleImageUploadSuccess)} isUploading={isUploading}
        onSubmit={(e) => { e.preventDefault(); postsState.postMutation.mutate(postsState.postData); }}
        isPending={postsState.postMutation.isPending}
      />
    </div>
  );
}

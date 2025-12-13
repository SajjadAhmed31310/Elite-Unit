import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Rightbar from './components/Rightbar';
import CreatePostBox from './components/CreatePostBox';
import PostCard from './components/PostCard';
import FriendsView from './components/FriendsView';
import NotificationsView from './components/NotificationsView';
import ChatView from './components/ChatView';
import { CURRENT_USER, INITIAL_POSTS, MOCK_FRIENDS } from './constants';
import { Post } from './types';
import { generateMockPost } from './services/geminiService';
import { RefreshCcw, Layout, UserCircle, Menu, ArrowLeft, Users, Video, Bookmark, Clock, Calendar } from 'lucide-react';

// Placeholder View Component
const SimpleView: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center min-h-[400px] animate-fade-in">
    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500">
        {icon || <Layout size={40} />}
    </div>
    <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
    <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
      This is the <strong>{title}</strong> page. We are currently working on bringing this feature to life. 
    </p>
    <button 
        onClick={() => window.location.hash = '#/'}
        className="mt-8 px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
        Back to Feed
    </button>
  </div>
);

// Placeholder Profile View
const ProfileView: React.FC<{ userId?: string }> = ({ userId }) => {
    // Safety check: ensure we don't crash if userId is malformed
    const safeUserId = userId || CURRENT_USER.id;
    const user = MOCK_FRIENDS.find(u => u.id === safeUserId) || (safeUserId === CURRENT_USER.id ? CURRENT_USER : null);
    
    // Fallback if user not found
    if (!user) {
        return <SimpleView title="User Not Found" icon={<Users size={40} />} />;
    }

    return (
        <div className="animate-fade-in">
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
                 <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
                      <button 
                        onClick={() => window.location.hash = '#/'}
                        className="absolute top-4 left-4 p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors"
                      >
                          <ArrowLeft size={24} />
                      </button>
                 </div>
                 <div className="px-6 pb-6 relative">
                     <div className="absolute -top-16 left-6 border-4 border-white rounded-full">
                         <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full object-cover bg-white" />
                     </div>
                     <div className="mt-20 flex justify-between items-end">
                         <div>
                             <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                             <p className="text-gray-500">{user.handle}</p>
                             <p className="text-sm text-gray-500 mt-1">Software Engineer • {user.status === 'online' ? 'Active Now' : 'Last seen recently'}</p>
                         </div>
                         <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                             Edit Profile
                         </button>
                     </div>
                 </div>
             </div>
             <SimpleView title="User Posts & Activity" icon={<Layout size={40} />} />
        </div>
    );
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Router Logic
  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash || '#/';
      setRoute(currentHash);
      window.scrollTo(0, 0);
    };
    
    // Set initial hash if empty
    if (!window.location.hash) window.history.replaceState(null, '', '#/');
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePostCreate = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: CURRENT_USER,
      content,
      likes: 0,
      comments: [],
      shares: 0,
      timestamp: 'Just now'
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (id: string) => {
      // Logic handled locally in PostCard for UI
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
        const topics = ["Technology", "Hiking", "Food", "Space", "Coding"];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        
        // Use service which already handles errors internally, but double wrap for safety
        const aiPost = await generateMockPost(randomTopic);
        
        const newMockPost: Post = {
            id: `gen-${Date.now()}`,
            author: {
                id: `u-${Date.now()}`,
                name: 'AI Generated User',
                handle: '@ai_user',
                avatar: `https://picsum.photos/150/150?random=${Date.now()}`
            },
            content: aiPost.content,
            likes: Math.floor(Math.random() * 50),
            comments: [],
            shares: Math.floor(Math.random() * 10),
            timestamp: 'Just now',
            image: Math.random() > 0.5 ? `https://picsum.photos/800/500?random=${Date.now()}` : undefined
        };

        setPosts(prev => [...prev, newMockPost]);
    } catch (e) {
        console.error("Failed to load more posts:", e);
        // Optional: Show a toast here if we had a toast system
    } finally {
        setIsLoadingMore(false);
    }
  };

  const renderContent = () => {
      // Basic route parsing
      let [path, queryString] = route.split('?');
      const params = new URLSearchParams(queryString);
      
      // Robust routing matches
      if (path.startsWith('#/profile/')) {
          const userId = path.split('/')[2];
          return <ProfileView userId={userId} />;
      }
      if (path === '#/profile') return <ProfileView userId={CURRENT_USER.id} />;
      
      if (path.startsWith('#/groups')) return <SimpleView title="Groups" icon={<UserCircle size={48} />} />;
      if (path.startsWith('#/saved')) return <SimpleView title="Saved Items" icon={<Bookmark size={48} />} />;
      if (path.startsWith('#/watch')) return <SimpleView title="Watch" icon={<Video size={48} />} />;
      if (path.startsWith('#/memories')) return <SimpleView title="Memories" icon={<Clock size={48} />} />;
      if (path.startsWith('#/events')) return <SimpleView title="Events" icon={<Calendar size={48} />} />;
      
      if (path === '#/menu') return <SimpleView title="Menu" icon={<Menu size={48} />} />;
      if (path === '#/more') return <SimpleView title="More Options" icon={<Layout size={48} />} />;

      switch(path) {
          case '#/friends': 
            return <FriendsView />;
          case '#/messages': 
            return <ChatView initialUserId={params.get('user') || undefined} />;
          case '#/notifications': 
            return <NotificationsView />;
          case '#/':
          case '#/home':
              return (
                <>
                    {/* Stories */}
                    <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
                        <div className="flex-shrink-0 w-28 h-48 bg-white rounded-xl overflow-hidden relative shadow-sm cursor-pointer group hover:opacity-90 transition-opacity">
                            <img src={CURRENT_USER.avatar} className="w-full h-3/4 object-cover transition-transform group-hover:scale-105" alt="Story" />
                            <div className="absolute bottom-0 w-full h-1/4 bg-white flex justify-center items-end pb-2">
                                <span className="text-xs font-semibold">Create Story</span>
                            </div>
                            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-lg">+</div>
                        </div>
                        {[1,2,3,4].map(i => (
                            <div key={i} className="flex-shrink-0 w-28 h-48 bg-gray-300 rounded-xl overflow-hidden relative cursor-pointer group shadow-sm hover:opacity-90 transition-opacity">
                                <img src={`https://picsum.photos/200/400?random=${i+50}`} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" alt="Story" />
                                <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-4 border-blue-500 overflow-hidden">
                                    <img src={`https://picsum.photos/100/100?random=${i+10}`} className="w-full h-full object-cover" alt="User" />
                                </div>
                                <span className="absolute bottom-2 left-2 text-white text-xs font-bold shadow-black drop-shadow-md">User {i}</span>
                            </div>
                        ))}
                    </div>

                    <CreatePostBox currentUser={CURRENT_USER} onPostCreate={handlePostCreate} />
                    
                    <div className="space-y-4">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} onLike={handleLike} />
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center pb-8">
                        <button 
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            className="flex items-center space-x-2 px-6 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCcw size={18} className={isLoadingMore ? "animate-spin" : ""} />
                            <span>{isLoadingMore ? "Loading..." : "Load More"}</span>
                        </button>
                    </div>
                </>
              );
          default:
              // Safe fallback for truly unknown routes
              return <SimpleView title="Page Not Found" icon={<Layout size={40} />} />;
      }
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-gray-900">
      <Navbar currentUser={CURRENT_USER} currentRoute={route} />
      
      <div className="flex justify-center max-w-[1920px] mx-auto">
        <Sidebar currentUser={CURRENT_USER} currentRoute={route} />
        
        <main className="flex-1 max-w-[700px] w-full p-4 lg:px-8">
            {renderContent()}
        </main>

        <Rightbar />
      </div>
    </div>
  );
};

export default App;
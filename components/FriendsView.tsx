import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_FRIENDS, MOCK_FRIEND_REQUESTS } from '../constants';
import Avatar from './Avatar';
import { Search, MessageCircle, User as UserIcon, Check, X, UserPlus } from 'lucide-react';

const FriendsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'requests'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState<User[]>(MOCK_FRIEND_REQUESTS);
  const [friends, setFriends] = useState<User[]>(MOCK_FRIENDS);

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    friend.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAcceptRequest = (user: User) => {
    // Remove from requests
    setRequests(prev => prev.filter(req => req.id !== user.id));
    // Add to friends
    setFriends(prev => [user, ...prev]);
  };

  const handleDeleteRequest = (id: string) => {
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Friends" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
            <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                All Friends ({friends.length})
            </button>
            <button 
                onClick={() => setActiveTab('requests')}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'requests' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Friend Requests <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">{requests.length}</span>
            </button>
        </div>

        {activeTab === 'requests' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requests.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                            <UserPlus size={32} className="text-gray-400" />
                        </div>
                        <p>No new friend requests.</p>
                    </div>
                ) : (
                    requests.map(req => (
                        <div key={req.id} className="border border-gray-100 rounded-xl p-4 flex items-center space-x-4 bg-white shadow-sm">
                            <Avatar src={req.avatar} alt={req.name} size="lg" />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 truncate" onClick={() => window.location.hash = `#/profile/${req.id}`}>{req.name}</h3>
                                <p className="text-gray-500 text-sm truncate">{req.mutualFriends} mutual friends</p>
                            </div>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => handleAcceptRequest(req)}
                                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                                >
                                    <Check size={18} />
                                    <span className="text-sm font-medium hidden sm:inline">Confirm</span>
                                </button>
                                <button 
                                    onClick={() => handleDeleteRequest(req.id)}
                                    className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1"
                                >
                                    <X size={18} />
                                    <span className="text-sm font-medium hidden sm:inline">Delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}

        {activeTab === 'all' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFriends.map(friend => (
                <div key={friend.id} className="border border-gray-100 rounded-xl p-4 flex items-center space-x-4 hover:shadow-md transition-shadow bg-white">
                <div className="relative">
                    <Avatar src={friend.avatar} alt={friend.name} size="lg" />
                    {friend.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate cursor-pointer hover:underline" onClick={() => window.location.hash = `#/profile/${friend.id}`}>
                        {friend.name}
                    </h3>
                    <p className="text-gray-500 text-sm truncate">{friend.mutualFriends} mutual friends</p>
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => window.location.hash = `#/messages?user=${friend.id}`}
                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Message"
                    >
                        <MessageCircle size={20} />
                    </button>
                    <button 
                        onClick={() => window.location.hash = `#/profile/${friend.id}`}
                        className="p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        title="View Profile"
                    >
                        <UserIcon size={20} />
                    </button>
                </div>
                </div>
            ))}
            
            {filteredFriends.length === 0 && (
                <div className="col-span-full py-8 text-center text-gray-500">
                    No friends found matching "{searchTerm}"
                </div>
            )}
            </div>
        )}
      </div>
    </div>
  );
};

export default FriendsView;
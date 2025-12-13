import React from 'react';
import { MOCK_FRIENDS } from '../constants';
import Avatar from './Avatar';
import { Gift, Search, MessageSquare } from 'lucide-react';

const Rightbar: React.FC = () => {
  // Sort friends: Online first, then by name
  const sortedFriends = [...MOCK_FRIENDS].sort((a, b) => {
      if (a.status === b.status) return a.name.localeCompare(b.name);
      return a.status === 'online' ? -1 : 1;
  });

  return (
    <aside className="w-[300px] hidden md:flex flex-col h-[calc(100vh-56px)] sticky top-14 p-4 overflow-y-auto no-scrollbar">
      
      {/* Sponsored/Ads placeholder */}
      <div className="mb-6">
        <h3 className="text-gray-500 font-semibold mb-2 text-sm">Sponsored</h3>
        <div 
            onClick={() => console.log('Ad clicked')}
            className="flex items-center space-x-3 mb-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
            <img src="https://picsum.photos/120/120?random=200" className="w-28 h-28 object-cover rounded-lg" alt="Ad" />
            <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm">Super Fast API</span>
                <span className="text-xs text-gray-500">api.example.com</span>
            </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-2"></div>

      {/* Birthdays */}
      <div className="mb-6">
         <h3 className="text-gray-500 font-semibold mb-3 text-sm">Birthdays</h3>
         <div 
            onClick={() => window.location.hash = '#/events'}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
         >
             <Gift size={24} className="text-blue-500" />
             <p className="text-sm text-gray-800">
                 <span className="font-semibold">Sarah Designer</span> and <span className="font-semibold">2 others</span> have birthdays today.
             </p>
         </div>
      </div>

      <div className="border-t border-gray-200 my-2"></div>

      {/* Contacts */}
      <div className="flex items-center justify-between mb-2">
         <h3 className="text-gray-500 font-semibold text-sm">Contacts</h3>
         <div className="flex space-x-2 text-gray-500">
             <Search size={16} className="cursor-pointer hover:text-gray-700" />
         </div>
      </div>

      <div className="space-y-1">
        {sortedFriends.map(user => (
            <div 
                key={user.id} 
                onClick={() => window.location.hash = `#/messages?user=${user.id}`}
                className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors group relative"
            >
                <div className="relative">
                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                    {user.status === 'online' && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                </div>
                <span className="font-medium text-gray-900 text-sm flex-1 truncate">{user.name}</span>
                {user.status === 'online' && (
                    <MessageSquare size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
            </div>
        ))}
      </div>

    </aside>
  );
};

export default Rightbar;
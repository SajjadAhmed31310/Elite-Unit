import React from 'react';
import { MOCK_FRIENDS } from '../constants';
import Avatar from './Avatar';
import { Gift, Search } from 'lucide-react';

const Rightbar: React.FC = () => {
  return (
    <aside className="w-[300px] hidden md:flex flex-col h-[calc(100vh-56px)] sticky top-14 p-4 overflow-y-auto no-scrollbar">
      <div className="mb-6">
         <h3 className="text-gray-500 font-semibold mb-3 text-sm">Birthdays</h3>
         <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
             <Gift size={24} className="text-blue-500" />
             <p className="text-sm text-gray-800">1 person has a birthday today.</p>
         </div>
      </div>
      <div className="border-t border-gray-200 my-2"></div>
      <div className="flex items-center justify-between mb-2">
         <h3 className="text-gray-500 font-semibold text-sm">Contacts</h3>
         <Search size={16} className="text-gray-500" />
      </div>
      <div className="space-y-1">
        {MOCK_FRIENDS.map(user => (
            <div key={user.id} onClick={() => window.location.hash = `#/messages?user=${user.id}`} className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div className="relative">
                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                    {user.status === 'online' && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                </div>
                <span className="font-medium text-gray-900 text-sm flex-1 truncate">{user.name}</span>
            </div>
        ))}
      </div>
    </aside>
  );
};

export default Rightbar;
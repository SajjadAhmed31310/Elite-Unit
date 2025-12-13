import React from 'react';
import { User } from '../types';
import Avatar from './Avatar';
import { Search, Home, Users, Bell, MessageSquare, Menu, Zap } from 'lucide-react';

interface NavbarProps {
  currentUser: User;
  currentRoute?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, currentRoute }) => {
  const isHome = currentRoute === '#/' || currentRoute === '#/home';

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          console.log('Search triggered');
          // Implement search logic here
      }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 h-14 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Left: Logo & Search */}
        <div className="flex items-center space-x-4">
          <a href="#/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
             <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                <Zap size={20} fill="currentColor" />
             </div>
             <span className="text-xl font-bold text-gray-900 hidden lg:block tracking-tight">StorySpark</span>
          </a>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 w-64 group focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Search size={18} className="text-gray-400 cursor-pointer" onClick={() => console.log('Search click')} />
            <input 
                type="text" 
                placeholder="Search StorySpark" 
                onKeyDown={handleSearchKeyDown}
                className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-gray-700"
            />
          </div>
          <button className="md:hidden p-2 bg-gray-100 rounded-full text-gray-600">
             <Search size={20} />
          </button>
        </div>

        {/* Center: Navigation Icons (Desktop) */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-xl mx-auto h-full space-x-1">
            <NavIcon icon={<Home size={24} />} href="#/" active={isHome} />
            <NavIcon icon={<Users size={24} />} href="#/friends" active={currentRoute === '#/friends'} />
            <NavIcon 
                icon={<div className="relative"><Bell size={24} /><span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span></div>} 
                href="#/notifications"
                active={currentRoute === '#/notifications'}
            />
        </div>

        {/* Right: Profile & Actions */}
        <div className="flex items-center justify-end space-x-3">
          <a href="#/menu" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors hidden sm:block flex items-center justify-center">
            <Menu size={20} />
          </a>
          <a href="#/messages" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-colors flex items-center justify-center">
            <MessageSquare size={20} />
          </a>
          <a href="#/profile">
             <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" className="cursor-pointer hover:opacity-90 transition-opacity" />
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavIcon = ({ icon, active = false, href }: { icon: React.ReactNode, active?: boolean, href: string }) => (
    <a 
        href={href}
        className={`flex-1 h-full flex items-center justify-center cursor-pointer border-b-2 transition-all hover:bg-gray-50 rounded-lg md:rounded-none mx-1 md:mx-0 
        ${active ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
    >
        {icon}
    </a>
);

export default Navbar;
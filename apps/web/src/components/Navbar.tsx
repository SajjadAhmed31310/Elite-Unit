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

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 h-14 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href="#/" className="flex items-center space-x-2">
             <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white"><Zap size={20} fill="currentColor" /></div>
             <span className="text-xl font-bold text-gray-900 hidden lg:block">StorySpark</span>
          </a>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 w-64">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full" />
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center flex-1 max-w-xl mx-auto h-full space-x-1">
            <NavIcon icon={<Home size={24} />} href="#/" active={isHome} />
            <NavIcon icon={<Users size={24} />} href="#/friends" active={currentRoute === '#/friends'} />
            <NavIcon icon={<Bell size={24} />} href="#/notifications" active={currentRoute === '#/notifications'} />
        </div>
        <div className="flex items-center justify-end space-x-3">
          <a href="#/messages" className="p-2 bg-gray-100 rounded-full"><MessageSquare size={20} /></a>
          <a href="#/profile"><Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" /></a>
        </div>
      </div>
    </nav>
  );
};

const NavIcon = ({ icon, active = false, href }: any) => (
    <a href={href} className={`flex-1 h-full flex items-center justify-center border-b-2 ${active ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>{icon}</a>
);

export default Navbar;
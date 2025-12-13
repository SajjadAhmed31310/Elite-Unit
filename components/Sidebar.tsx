import React from 'react';
import { User } from '../types';
import Avatar from './Avatar';
import { UserCircle, Users, Bookmark, Clock, Calendar, ChevronDown, Video } from 'lucide-react';

interface SidebarProps {
    currentUser: User;
    currentRoute?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, currentRoute }) => {
  return (
    <aside className="w-[300px] hidden lg:flex flex-col h-[calc(100vh-56px)] sticky top-14 p-4 overflow-y-auto no-scrollbar">
      <div className="space-y-1">
        <SidebarItem 
            icon={<Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" className="w-8 h-8" />} 
            label={currentUser.name} 
            href="#/profile"
            active={currentRoute === '#/profile'}
        />
        <SidebarItem 
            icon={<Users size={24} className="text-blue-500" />} 
            label="Friends" 
            href="#/friends" 
            active={currentRoute === '#/friends'}
        />
        <SidebarItem 
            icon={<UserCircle size={24} className="text-blue-400" />} 
            label="Groups" 
            href="#/groups" 
            active={currentRoute === '#/groups'}
        />
        <SidebarItem 
            icon={<Bookmark size={24} className="text-purple-500" />} 
            label="Saved" 
            href="#/saved" 
            active={currentRoute === '#/saved'}
        />
        <SidebarItem 
            icon={<Video size={24} className="text-red-500" />} 
            label="Watch" 
            href="#/watch" 
            active={currentRoute === '#/watch'}
        />
        <SidebarItem 
            icon={<Clock size={24} className="text-blue-500" />} 
            label="Memories" 
            href="#/memories" 
            active={currentRoute === '#/memories'}
        />
        <SidebarItem 
            icon={<Calendar size={24} className="text-red-400" />} 
            label="Events" 
            href="#/events" 
            active={currentRoute === '#/events'}
        />
        <SidebarItem 
            icon={<div className="bg-gray-200 rounded-full p-1"><ChevronDown size={16} /></div>} 
            label="See more" 
            href="#/more"
        />
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <h3 className="text-gray-500 font-semibold mb-2 px-2 text-sm">Your Shortcuts</h3>
      <div className="space-y-1">
        <SidebarItem 
            icon={<img src="https://picsum.photos/40/40?random=100" className="rounded-lg w-8 h-8" alt="Group" />} 
            label="React Developers" 
            href="#/groups/react"
        />
        <SidebarItem 
            icon={<img src="https://picsum.photos/40/40?random=101" className="rounded-lg w-8 h-8" alt="Group" />} 
            label="Design System Enthusiasts" 
            href="#/groups/design"
        />
      </div>

      <div className="mt-auto px-2 text-xs text-gray-500">
        <p>Privacy · Terms · Advertising · Cookies · Meta © 2024</p>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, active }) => (
    <a 
        href={href}
        className={`flex items-center space-x-3 px-2 py-2 rounded-lg cursor-pointer transition-colors block
        ${active ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-200 font-medium text-gray-700'}`}
    >
        {icon}
        <span className="truncate">{label}</span>
    </a>
);

export default Sidebar;
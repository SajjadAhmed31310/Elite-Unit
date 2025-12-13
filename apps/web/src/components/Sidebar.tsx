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
        <SidebarItem icon={<Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" className="w-8 h-8" />} label={currentUser.name} href="#/profile" />
        <SidebarItem icon={<Users size={24} className="text-blue-500" />} label="Friends" href="#/friends" active={currentRoute === '#/friends'} />
        <SidebarItem icon={<UserCircle size={24} className="text-blue-400" />} label="Groups" href="#/groups" />
        <SidebarItem icon={<Bookmark size={24} className="text-purple-500" />} label="Saved" href="#/saved" />
        <SidebarItem icon={<Video size={24} className="text-red-500" />} label="Watch" href="#/watch" />
        <SidebarItem icon={<Clock size={24} className="text-blue-500" />} label="Memories" href="#/memories" />
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, href, active }: any) => (
    <a href={href} className={`flex items-center space-x-3 px-2 py-2 rounded-lg cursor-pointer hover:bg-gray-200 ${active ? 'bg-gray-200 font-semibold' : 'font-medium text-gray-700'}`}>
        {icon}<span>{label}</span>
    </a>
);

export default Sidebar;
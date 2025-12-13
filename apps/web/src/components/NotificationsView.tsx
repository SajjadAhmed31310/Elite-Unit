import React, { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '../constants';
import { Notification } from '../types';
import Avatar from './Avatar';
import { Heart, MessageCircle, UserPlus, AtSign, Bell } from 'lucide-react';

const NotificationsView: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const filteredNotifications = filter === 'all' 
        ? notifications 
        : notifications.filter(n => !n.isRead);

    const getIcon = (type: string) => {
        switch(type) {
            case 'like': return <Heart size={16} className="text-white fill-current" />;
            case 'comment': return <MessageCircle size={16} className="text-white fill-current" />;
            case 'follow': 
            case 'friend_req': return <UserPlus size={16} className="text-white fill-current" />;
            case 'mention': return <AtSign size={16} className="text-white" />;
            default: return <Bell size={16} className="text-white" />;
        }
    };

    const getIconBg = (type: string) => {
        switch(type) {
            case 'like': return 'bg-red-500';
            case 'comment': return 'bg-blue-500';
            case 'follow': 
            case 'friend_req': return 'bg-blue-600';
            case 'mention': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="animate-fade-in max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    <div className="flex space-x-2">
                         <button 
                            onClick={handleMarkAllAsRead}
                            className="text-sm text-blue-600 font-medium hover:underline"
                         >
                             Mark all as read
                         </button>
                    </div>
                </div>

                <div className="flex space-x-2 mb-6">
                    <button 
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setFilter('unread')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Unread
                    </button>
                </div>

                <div className="space-y-2">
                    {filteredNotifications.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Bell size={48} className="mx-auto mb-3 text-gray-300" />
                            <p>No notifications to show.</p>
                        </div>
                    ) : (
                        filteredNotifications.map(notification => (
                            <div 
                                key={notification.id} 
                                onClick={() => handleMarkAsRead(notification.id)}
                                className={`flex items-start space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${notification.isRead ? 'hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'}`}
                            >
                                <div className="relative">
                                    <Avatar src={notification.actor.avatar} alt={notification.actor.name} size="md" />
                                    <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${getIconBg(notification.type)}`}>
                                        {getIcon(notification.type)}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">
                                        <span className="font-bold">{notification.actor.name}</span> {notification.content}
                                    </p>
                                    <span className={`text-xs ${notification.isRead ? 'text-gray-500' : 'text-blue-600 font-semibold'}`}>
                                        {notification.timestamp}
                                    </span>
                                </div>
                                {!notification.isRead && (
                                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsView;
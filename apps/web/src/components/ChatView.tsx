import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CONVERSATIONS, MOCK_FRIENDS, CURRENT_USER } from '../constants';
import { Conversation, Message } from '../types';
import Avatar from './Avatar';
import { Send, ArrowLeft, MoreVertical, Phone, Video, MessageCircle } from 'lucide-react';

interface ChatViewProps {
    initialUserId?: string;
}

const ChatView: React.FC<ChatViewProps> = ({ initialUserId }) => {
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial load logic
    useEffect(() => {
        if (initialUserId) {
            // Check if conversation exists
            const existingConv = conversations.find(c => c.contactId === initialUserId);
            if (existingConv) {
                setActiveChatId(existingConv.id);
            } else {
                // Create temp conversation object for UI (not saved to list until message sent)
                const contact = MOCK_FRIENDS.find(u => u.id === initialUserId);
                if (contact) {
                    const newId = `new_${Date.now()}`;
                    const newConv: Conversation = {
                        id: newId,
                        contactId: contact.id,
                        messages: [],
                        unreadCount: 0,
                        lastMessageTime: 'New'
                    };
                    setConversations(prev => [newConv, ...prev]);
                    setActiveChatId(newId);
                }
            }
        } else if (conversations.length > 0 && !activeChatId) {
            // Optional: Auto-select first chat on desktop
            if (window.innerWidth >= 768) {
                setActiveChatId(conversations[0].id);
            }
        }
    }, [initialUserId]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeChatId, conversations]);

    const activeConversation = conversations.find(c => c.id === activeChatId);
    const activeContact = activeConversation 
        ? MOCK_FRIENDS.find(u => u.id === activeConversation.contactId) 
        : null;

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!messageInput.trim() || !activeChatId) return;

        const newMessage: Message = {
            id: `msg_${Date.now()}`,
            senderId: CURRENT_USER.id,
            content: messageInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setConversations(prev => prev.map(c => {
            if (c.id === activeChatId) {
                return {
                    ...c,
                    messages: [...c.messages, newMessage],
                    lastMessageTime: 'Just now'
                };
            }
            return c;
        }));

        setMessageInput('');
    };

    const getContact = (id: string) => MOCK_FRIENDS.find(u => u.id === id);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-100px)] flex overflow-hidden animate-fade-in">
            {/* Sidebar List */}
            <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                </div>
                <div className="overflow-y-auto flex-1 no-scrollbar">
                    {conversations.map(conv => {
                        const contact = getContact(conv.contactId);
                        if (!contact) return null;
                        const isActive = conv.id === activeChatId;
                        return (
                            <div 
                                key={conv.id}
                                onClick={() => setActiveChatId(conv.id)}
                                className={`flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${isActive ? 'bg-blue-50 hover:bg-blue-50' : ''}`}
                            >
                                <div className="relative">
                                    <Avatar src={contact.avatar} alt={contact.name} size="md" />
                                    {contact.status === 'online' && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={`text-sm font-semibold truncate ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>{contact.name}</h3>
                                        <span className="text-xs text-gray-400">{conv.lastMessageTime}</span>
                                    </div>
                                    <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                        {conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].content : 'Start a conversation'}
                                    </p>
                                </div>
                                {conv.unreadCount > 0 && (
                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">{conv.unreadCount}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col bg-white ${!activeChatId ? 'hidden md:flex' : 'flex'}`}>
                {activeConversation && activeContact ? (
                    <>
                        {/* Header */}
                        <div className="p-3 border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
                            <div className="flex items-center space-x-3">
                                <button 
                                    onClick={() => setActiveChatId(null)}
                                    className="md:hidden p-2 -ml-2 text-gray-500"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <div className="relative">
                                    <Avatar src={activeContact?.avatar} alt={activeContact?.name} size="sm" />
                                    {activeContact?.status === 'online' && (
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">{activeContact?.name}</h3>
                                    <p className="text-xs text-green-500">{activeContact?.status === 'online' ? 'Active now' : 'Offline'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 text-blue-500">
                                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors"><Phone size={20} /></button>
                                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors"><Video size={20} /></button>
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"><MoreVertical size={20} /></button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {activeConversation.messages.map(msg => {
                                const isMe = msg.senderId === CURRENT_USER.id;
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-900 rounded-bl-none'}`}>
                                            <p className="text-sm">{msg.content}</p>
                                            <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>{msg.timestamp}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100">
                            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                                <input 
                                    type="text" 
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Type a message..." 
                                    className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-900"
                                />
                                <button 
                                    type="submit"
                                    disabled={!messageInput.trim()}
                                    className={`p-2 rounded-full transition-colors ${messageInput.trim() ? 'text-blue-600 hover:bg-blue-100 cursor-pointer' : 'text-gray-400 cursor-default'}`}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <MessageCircle size={64} className="mb-4 text-gray-200" />
                        <p className="text-lg font-medium text-gray-500">Select a conversation</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatView;
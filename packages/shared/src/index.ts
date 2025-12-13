export interface User {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  status?: 'online' | 'offline';
  mutualFriends?: number;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
  isLiked?: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'friend_req';
  actor: User;
  content: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  contactId: string;
  messages: Message[];
  unreadCount: number;
  lastMessageTime: string;
}

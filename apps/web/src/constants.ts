import { Post, User, Notification, Conversation } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Developer',
  handle: '@alexdev',
  avatar: 'https://picsum.photos/150/150?random=1',
  status: 'online'
};

export const MOCK_USERS: User[] = [
  { id: 'u2', name: 'Sarah Designer', handle: '@sarahd', avatar: 'https://picsum.photos/150/150?random=2', status: 'online', mutualFriends: 12 },
  { id: 'u3', name: 'Mike Manager', handle: '@mikem', avatar: 'https://picsum.photos/150/150?random=3', status: 'offline', mutualFriends: 5 },
  { id: 'u4', name: 'Jessica Writer', handle: '@jessw', avatar: 'https://picsum.photos/150/150?random=4', status: 'online', mutualFriends: 8 },
];

export const MOCK_FRIENDS: User[] = [
  ...MOCK_USERS,
  { id: 'u5', name: 'David Coder', handle: '@daved', avatar: 'https://picsum.photos/150/150?random=5', status: 'online', mutualFriends: 3 },
  { id: 'u6', name: 'Emily Rose', handle: '@emilyr', avatar: 'https://picsum.photos/150/150?random=6', status: 'offline', mutualFriends: 15 },
  { id: 'u7', name: 'Chris Front', handle: '@chrisf', avatar: 'https://picsum.photos/150/150?random=7', status: 'online', mutualFriends: 22 },
];

export const MOCK_FRIEND_REQUESTS: User[] = [
  { id: 'req1', name: 'Kevin DevOps', handle: '@kevops', avatar: 'https://picsum.photos/150/150?random=20', status: 'offline', mutualFriends: 7 },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: MOCK_USERS[0],
    content: 'Just launched the new design system! 🚀',
    image: 'https://picsum.photos/800/400?random=10',
    likes: 42,
    shares: 5,
    timestamp: '2h ago',
    comments: []
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', type: 'like', actor: MOCK_USERS[0], content: 'liked your post', timestamp: '10m ago', isRead: false },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'c1',
        contactId: 'u2',
        unreadCount: 2,
        lastMessageTime: '10:06 AM',
        messages: [
            { id: 'm1', senderId: 'u2', content: 'Hey!', timestamp: '10:00 AM' }
        ]
    }
];
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
  { id: 'u8', name: 'Anna Backend', handle: '@annab', avatar: 'https://picsum.photos/150/150?random=8', status: 'offline', mutualFriends: 1 },
];

export const MOCK_FRIEND_REQUESTS: User[] = [
  { id: 'req1', name: 'Kevin DevOps', handle: '@kevops', avatar: 'https://picsum.photos/150/150?random=20', status: 'offline', mutualFriends: 7 },
  { id: 'req2', name: 'Laura UX', handle: '@lauraux', avatar: 'https://picsum.photos/150/150?random=21', status: 'online', mutualFriends: 2 },
  { id: 'req3', name: 'Tom Product', handle: '@tompm', avatar: 'https://picsum.photos/150/150?random=22', status: 'online', mutualFriends: 14 },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: MOCK_USERS[0],
    content: 'Just launched the new design system! 🚀 It’s amazing how much cleaner the UI looks now. #design #uiux',
    image: 'https://picsum.photos/800/400?random=10',
    likes: 42,
    shares: 5,
    timestamp: '2h ago',
    comments: [
      {
        id: 'c1',
        author: MOCK_USERS[1],
        content: 'Looks incredible! Great work team.',
        timestamp: '1h ago',
        likes: 3
      }
    ]
  },
  {
    id: 'p2',
    author: MOCK_USERS[1],
    content: 'Anyone else having trouble with the latest Docker update? 🐳 Ideally looking for some quick fixes.',
    likes: 12,
    shares: 0,
    timestamp: '4h ago',
    comments: []
  },
  {
    id: 'p3',
    author: MOCK_USERS[2],
    content: 'Beautiful sunset this evening. Sometimes you just need to step away from the screen.',
    image: 'https://picsum.photos/800/500?random=11',
    likes: 89,
    shares: 12,
    timestamp: '6h ago',
    comments: []
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', type: 'like', actor: MOCK_USERS[0], content: 'liked your post about "Design System"', timestamp: '10m ago', isRead: false },
    { id: 'n2', type: 'comment', actor: MOCK_USERS[1], content: 'commented on your photo: "Great view!"', timestamp: '1h ago', isRead: false },
    { id: 'n3', type: 'follow', actor: MOCK_USERS[2], content: 'started following you', timestamp: '2h ago', isRead: true },
    { id: 'n4', type: 'friend_req', actor: MOCK_FRIEND_REQUESTS[0], content: 'sent you a friend request', timestamp: '1d ago', isRead: true },
    { id: 'n5', type: 'mention', actor: MOCK_FRIENDS[3], content: 'mentioned you in a comment', timestamp: '2d ago', isRead: true },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'c1',
        contactId: 'u2',
        unreadCount: 2,
        lastMessageTime: '10:06 AM',
        messages: [
            { id: 'm1', senderId: 'u2', content: 'Hey, how is the project going?', timestamp: '10:00 AM' },
            { id: 'm2', senderId: 'u1', content: 'Pretty good! Just finishing up the UI.', timestamp: '10:05 AM' },
            { id: 'm3', senderId: 'u2', content: 'Awesome, cant wait to see it.', timestamp: '10:06 AM' }
        ]
    },
    {
        id: 'c2',
        contactId: 'u3',
        unreadCount: 0,
        lastMessageTime: 'Yesterday',
        messages: [
            { id: 'm1', senderId: 'u3', content: 'Can we reschedule the meeting?', timestamp: 'Yesterday' },
            { id: 'm2', senderId: 'u1', content: 'Sure, what time works for you?', timestamp: 'Yesterday' }
        ]
    }
];
import React, { useState } from 'react';
import { Post } from '../types';
import Avatar from './Avatar';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [isLikedLocal, setIsLikedLocal] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    const newLiked = !isLikedLocal;
    setIsLikedLocal(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    onLike(post.id);
  };

  const handleAction = (action: string) => {
      // Placeholder for future functionality
      console.log(`${action} clicked for post ${post.id}`);
      // In a real app, this would open a modal or navigate
  };

  const navigateToProfile = () => {
      window.location.hash = `#/profile/${post.author.id}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={navigateToProfile}>
          <Avatar src={post.author.avatar} alt={post.author.name} />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm group-hover:underline">{post.author.name}</h3>
            <p className="text-gray-500 text-xs">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:bg-gray-50 rounded-full p-2 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Image Attachment */}
      {post.image && (
        <div className="mt-2 w-full h-80 bg-gray-100 relative">
            <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center space-x-1">
          <div className="bg-blue-500 p-1 rounded-full">
             <Heart size={10} className="text-white fill-current" />
          </div>
          <span className="text-gray-500 text-xs hover:underline cursor-pointer">{likeCount}</span>
        </div>
        <div className="text-gray-500 text-xs space-x-3">
          <span className="hover:underline cursor-pointer" onClick={() => handleAction('View Comments')}>{post.comments.length} comments</span>
          <span className="hover:underline cursor-pointer" onClick={() => handleAction('View Shares')}>{post.shares} shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-2 py-1 flex items-center justify-between">
        <button 
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${isLikedLocal ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <Heart size={18} className={isLikedLocal ? 'fill-current' : ''} />
          <span className="font-medium text-sm">Like</span>
        </button>
        <button 
            onClick={() => handleAction('Comment')}
            className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <MessageCircle size={18} />
          <span className="font-medium text-sm">Comment</span>
        </button>
        <button 
            onClick={() => handleAction('Share')}
            className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Share2 size={18} />
          <span className="font-medium text-sm">Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
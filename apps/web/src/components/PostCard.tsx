import React, { useState } from 'react';
import { Post, Comment } from '../types';
import { CURRENT_USER } from '../constants';
import Avatar from './Avatar';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [isLikedLocal, setIsLikedLocal] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  // Comment Logic
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [commentInput, setCommentInput] = useState('');

  const handleLike = () => {
    const newLiked = !isLikedLocal;
    setIsLikedLocal(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    onLike(post.id);
  };

  const handleAction = (action: string) => {
      if (action === 'Share') {
          alert("Link copied to clipboard!");
      }
  };

  const toggleComments = () => {
      setShowComments(!showComments);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!commentInput.trim()) return;

      const newComment: Comment = {
          id: `c_${Date.now()}`,
          author: CURRENT_USER,
          content: commentInput,
          timestamp: 'Just now',
          likes: 0
      };

      setComments(prev => [...prev, newComment]);
      setCommentInput('');
  };

  const navigateToProfile = () => {
      window.location.hash = `#/profile/${post.author.id}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden animate-fade-in">
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
          <span className="hover:underline cursor-pointer" onClick={toggleComments}>{comments.length} comments</span>
          <span className="hover:underline cursor-pointer" onClick={() => handleAction('Share')}>{post.shares} shares</span>
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
            onClick={toggleComments}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${showComments ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
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

      {/* Comment Section */}
      {showComments && (
          <div className="bg-gray-50 p-4 border-t border-gray-100">
              {/* Existing Comments */}
              <div className="space-y-4 mb-4">
                  {comments.map(comment => (
                      <div key={comment.id} className="flex space-x-2">
                          <Avatar src={comment.author.avatar} alt={comment.author.name} size="sm" className="mt-1" />
                          <div className="flex-1">
                              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm inline-block">
                                  <h4 className="font-bold text-xs text-gray-900">{comment.author.name}</h4>
                                  <p className="text-sm text-gray-800">{comment.content}</p>
                              </div>
                              <div className="flex items-center space-x-3 mt-1 ml-2">
                                  <span className="text-xs text-gray-500 font-medium cursor-pointer hover:underline">Like</span>
                                  <span className="text-xs text-gray-500 font-medium cursor-pointer hover:underline">Reply</span>
                                  <span className="text-xs text-gray-400">{comment.timestamp}</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              {/* Input */}
              <div className="flex items-center space-x-2">
                  <Avatar src={CURRENT_USER.avatar} alt={CURRENT_USER.name} size="sm" />
                  <form onSubmit={handleSubmitComment} className="flex-1 flex items-center bg-white rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 transition-shadow">
                      <input 
                          type="text" 
                          value={commentInput} 
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Write a comment..." 
                          className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                      />
                      <button 
                        type="submit" 
                        disabled={!commentInput.trim()}
                        className={`ml-2 p-1 rounded-full ${commentInput.trim() ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-300'}`}
                      >
                          <Send size={16} />
                      </button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default PostCard;
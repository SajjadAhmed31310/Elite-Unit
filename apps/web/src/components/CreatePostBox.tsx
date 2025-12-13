import React, { useState } from 'react';
import { User } from '../types';
import Avatar from './Avatar';
import Button from './Button';
import { Image, Smile, Wand2, AlertCircle } from 'lucide-react';
import { generatePostEnhancement } from '../services/geminiService';

interface CreatePostBoxProps {
  currentUser: User;
  onPostCreate: (content: string) => void;
}

const CreatePostBox: React.FC<CreatePostBoxProps> = ({ currentUser, onPostCreate }) => {
  const [content, setContent] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onPostCreate(content);
    setContent('');
    setError(null);
  };

  const handleEnhance = async () => {
    if (!content.trim()) return;
    
    setIsEnhancing(true);
    setError(null);

    try {
      const original = content;
      const enhanced = await generatePostEnhancement(content);
      
      // Check if the service returned the original text (fallback behavior)
      if (enhanced === original) {
        setError("AI Enhancement unavailable or no changes suggested.");
      } else {
        setContent(enhanced);
      }
    } catch (e) {
      console.error("Enhancement failed:", e);
      setError("Failed to connect to AI service. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex space-x-3">
        <Avatar src={currentUser.avatar} alt={currentUser.name} />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => {
                setContent(e.target.value);
                if (error) setError(null);
            }}
            placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
            className="w-full bg-gray-50 rounded-xl p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none transition-all"
            rows={3}
          />
        </div>
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-sm flex items-center bg-red-50 p-2 rounded-lg animate-fade-in">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2">
                <Image size={20} className="text-green-500" />
                <span className="text-sm font-medium hidden sm:inline">Photo</span>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2">
                <Smile size={20} className="text-yellow-500" />
                <span className="text-sm font-medium hidden sm:inline">Feeling</span>
            </button>
        </div>
        
        <div className="flex items-center space-x-2">
            {content.length > 5 && (
                <button 
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className="text-purple-600 hover:bg-purple-50 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors disabled:opacity-50"
                >
                    <Wand2 size={16} />
                    <span>{isEnhancing ? 'Magic...' : 'AI Enhance'}</span>
                </button>
            )}
            <Button 
                disabled={!content.trim() || isEnhancing} 
                onClick={handleSubmit} 
                size="sm"
            >
                Post
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostBox;
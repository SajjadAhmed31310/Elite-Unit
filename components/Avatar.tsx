import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-32 h-32'
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover border border-gray-200 ${sizeClasses[size]} ${className}`}
    />
  );
};

export default Avatar;

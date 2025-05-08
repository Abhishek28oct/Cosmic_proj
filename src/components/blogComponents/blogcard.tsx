import React, { useState } from 'react';

import geminidImg from '../../assets/blog/geminid.jpg';

interface BlogCardProps {
  title: string;
  summary: string;
  imageUrl: string;
  readTime: number;
  date: string;
  author: string;
  category: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  summary,
  imageUrl,
  readTime,
  date,
  author,
  category
}) => {
  // State for like button
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(14);

  // Function to convert date format
  const convertDateFormat = (dateString: string): string => {
    const [day, month, year] = dateString.split(':').map(Number);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${monthNames[month - 1]} ${day}, ${year}`;
  };

  // Get date in DD:MM:YYYY format
  const inputDate = "04:11:2024";
  const formattedDate = convertDateFormat(inputDate);

  // Handle like button click
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this article about ${title}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="blog-card rounded-xl overflow-hidden shadow-lg bg-zinc-600/25">
      <img
        src={imageUrl || 'https://via.placeholder.com/800x400?text=Article+Image'}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/800x400?text=Article+Image';
        }}
      />
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <span>{category}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime} min read</span>
        </div>
        <h3 className="text-lg font-semibold mt-2 text-gray-300">
          {title}
        </h3>
        <p className="text-gray-400 mt-2 line-clamp-2">
          {summary}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-400">By {author}</span>
          <a href="#" className="text-purple-500 hover:text-purple-400 transition-colors">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

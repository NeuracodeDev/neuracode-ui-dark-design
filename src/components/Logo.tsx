
import React from 'react';

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, showText = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`text-primary ${sizeClasses[size]}`}>
        {/* This is a placeholder for an actual SVG logo */}
        <svg 
          viewBox="0 0 24 24" 
          className={`${sizeClasses[size]}`}
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      {showText && (
        <span className={`font-semibold ${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-base'} bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text`}>
          NeuraCode
        </span>
      )}
    </div>
  );
};

export default Logo;

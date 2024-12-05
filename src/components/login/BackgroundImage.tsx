import React from 'react';

export interface BackgroundImage {
  url: string;
  description: string;
}

interface BackgroundImageProps {
  image: BackgroundImage;
}

export default function BackgroundImage({ image }: BackgroundImageProps) {
  return (
    <div 
      className="fixed inset-0 w-full h-full transition-opacity duration-700"
      style={{
        backgroundImage: `url(${image.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.5)',
        zIndex: -1
      }}
      role="img"
      aria-label={image.description}
    />
  );
}
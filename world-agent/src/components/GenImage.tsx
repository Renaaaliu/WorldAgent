import React, { useState, useEffect } from 'react';
import { generateAIImage } from '../services/imageService';
import { Loader2, Image as ImageIcon } from 'lucide-react';

interface GenImageProps {
  prompt: string;
  className?: string;
  alt?: string;
}

export const GenImage: React.FC<GenImageProps> = ({ prompt, className, alt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      setLoading(true);
      setError(false);
      const url = await generateAIImage(prompt);
      if (isMounted) {
        if (url) {
          setImageUrl(url);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    };

    fetchImage();
    return () => { isMounted = false; };
  }, [prompt]);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-900/50 border border-primary/10 ${className}`}>
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
        <span className="text-[10px] font-bold text-primary/50 uppercase tracking-widest">Generating Intelligence...</span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-900/50 border border-red-500/20 ${className}`}>
        <ImageIcon className="w-8 h-8 text-red-500/50 mb-2" />
        <span className="text-[10px] font-bold text-red-500/50 uppercase tracking-widest">Signal Lost</span>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl} 
      alt={alt || prompt} 
      className={className} 
      referrerPolicy="no-referrer"
    />
  );
};

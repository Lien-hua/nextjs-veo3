'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye } from 'lucide-react'; // 图标，可用 heroicons/lucide
import clsx from 'clsx';

export interface ImageData {
  id: string;
  prompt: string;
  image_url: string;
  tags?: string[];
  category?: string;
}

interface Props {
  image: ImageData;
}

export default function ImageCard({ image }: Props) {
  const [liked, setLiked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <Card className="overflow-hidden rounded-2xl shadow-md">
      <img src={image.image_url} alt={image.prompt} className="w-full h-64 object-cover" />
      <CardContent className="p-3 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 flex-wrap">
            {image.tags?.map(tag => (
              <Badge
                key={tag}
                className="text-xs bg-purple-100 text-purple-800 rounded px-2 py-1"
              >
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setLiked(prev => !prev)}
              className={clsx('text-lg transition-colors', liked ? 'text-red-500' : 'text-gray-400')}
              title="Like"
            >
              <Heart fill={liked ? 'currentColor' : 'none'} className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowPrompt(prev => !prev)}
              className="text-gray-500 text-xs underline hover:text-gray-700"
            >
              {showPrompt ? 'Hide Prompt' : 'View Prompt'}
            </button>
          </div>
        </div>

        {showPrompt && (
          <p className="text-sm text-gray-700 dark:text-gray-300 border-t pt-2">{image.prompt}</p>
        )}
      </CardContent>
    </Card>
  );
}

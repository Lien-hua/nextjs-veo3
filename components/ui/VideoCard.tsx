'use client';

import { Badge } from '@/components/ui/badge';

interface VideoCardProps {
  title: string;
  description: string;
  videoUrl: string;
  tags?: string[];
}

export default function VideoCard({ title, description, videoUrl, tags }: VideoCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
      <video
        src={videoUrl}
        controls
        className="w-full h-64 object-cover"
        preload="metadata"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags?.map(tag => (
            <Badge key={tag} className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

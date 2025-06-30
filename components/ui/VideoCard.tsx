'use client';

import { Badge } from '@/components/ui/badge';

interface VideoCardProps {
  title: string;
  description: string;
  storage_url: string; // 图片封面地址
  public_url: string;  // 视频播放地址
  tags?: string[];
}

export default function VideoCard({ title, description, storage_url, public_url, tags }: VideoCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
      <div className="relative w-full h-64 bg-black">
        <video
          poster={storage_url}
          src={public_url}
          controls
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>
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

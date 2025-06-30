'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import VideoCard from '@/components/VideoCard';

interface VideoData {
  id: string;
  title: string;
  description: string;
  video_url: string;
  tags?: string[];
}

export default function HomePage() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading videos:', error.message);
    } else {
      setVideos(data);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 Supabase Video Gallery</h1>

      {loading ? (
        <p className="text-center">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-center">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              videoUrl={video.video_url}
              tags={video.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}

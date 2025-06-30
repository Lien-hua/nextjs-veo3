'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import VideoCard from '@/components/ui/VideoCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface VideoData {
  id: string;
  title: string;
  description: string;
  storage_url: string;
  public_url: string;
  tags?: string[];
}

export default function HomePage() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, search, selectedTag]);

  async function fetchVideos() {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading videos:', error.message);
    } else {
      const vids = data as VideoData[];
      setVideos(vids);
      extractUniqueTags(vids);
    }

    setLoading(false);
  }

  function extractUniqueTags(videos: VideoData[]) {
    const tagSet = new Set<string>();
    for (const video of videos) {
      video.tags?.forEach(tag => tagSet.add(tag));
    }
    setAllTags(Array.from(tagSet));
  }

  function filterVideos() {
    const lowerSearch = search.toLowerCase();

    const result = videos.filter(video => {
      const matchesSearch =
        video.title.toLowerCase().includes(lowerSearch) ||
        video.description.toLowerCase().includes(lowerSearch);

      const matchesTag = !selectedTag || video.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });

    setFilteredVideos(result);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 Supabase Video Gallery</h1>

      <Input
        type="text"
        placeholder="Search videos..."
        className="mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
            className={`cursor-pointer text-sm px-3 py-1 rounded-full ${
              selectedTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            #{tag}
          </Badge>
        ))}
      </div>

      {loading ? (
        <p className="text-center">Loading videos...</p>
      ) : filteredVideos.length === 0 ? (
        <p className="text-center">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              storage_url={video.storage_url}
              public_url={video.public_url}
              tags={video.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}

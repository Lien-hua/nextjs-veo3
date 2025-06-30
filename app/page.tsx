'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import VideoCard from '@/components/ui/VideoCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface VideoData {
  id: string;
  title: string;
  description: string;
  storage_url: string;
  public_url: string;
  category?: string;
  tags?: string[];
}

const mockCategories = ['All', 'ASMR', 'Vlog', 'Tutorial', 'Shorts'];
const mockTags = ['relax', 'chocolate', 'capybara', 'whisper', 'gaming'];

export default function HomePage() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, search, selectedCategory, selectedTag]);

  async function fetchVideos() {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading videos:', error.message);
    } else {
      setVideos(data as VideoData[]);
    }

    setLoading(false);
  }

  function filterVideos() {
    const lowerSearch = search.toLowerCase();

    const result = videos.filter(video => {
      const matchesSearch =
        video.title.toLowerCase().includes(lowerSearch) ||
        video.description.toLowerCase().includes(lowerSearch);
      const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
      const matchesTag = !selectedTag || video.tags?.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
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

      <Tabs defaultValue="All" className="mb-4">
        <TabsList>
          {mockCategories.map(cat => (
            <TabsTrigger
              key={cat}
              value={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'font-bold' : ''}
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap gap-2 mb-6">
        {mockTags.map(tag => (
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

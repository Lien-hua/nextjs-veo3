'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ImageCard from '@/components/ui/ImageCard';

interface ImageData {
  id: string;
  prompt: string;
  image_url: string;
  tags?: string[];
  category?: string;
}

const mockCategories = ['All', 'Nature', 'Sci-fi', 'Abstract'];
const mockTags = ['robot', 'desert', 'fantasy', 'city', 'portrait'];

export default function GalleryPage() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const mockedData: ImageData[] = [
      {
        id: '1',
        prompt: 'A robot dancing in the desert',
        image_url: 'https://via.placeholder.com/400x300?text=Robot+Desert',
        category: 'Sci-fi',
        tags: ['robot', 'desert']
      },
      {
        id: '2',
        prompt: 'A dreamy fantasy forest landscape',
        image_url: 'https://via.placeholder.com/400x300?text=Fantasy+Forest',
        category: 'Nature',
        tags: ['fantasy', 'nature']
      },
      {
        id: '3',
        prompt: 'Futuristic city skyline at night',
        image_url: 'https://via.placeholder.com/400x300?text=City+Night',
        category: 'Sci-fi',
        tags: ['city', 'night']
      }
    ];
    setImages(mockedData);
  }

  const filteredImages = images.filter(img => {
    const matchesSearch = img.prompt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || img.category === selectedCategory;
    const matchesTag = !selectedTag || img.tags?.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">VEO3 Prompt Gallery</h1>

      <Input
        type="text"
        placeholder="Search prompts..."
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
              selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            #{tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

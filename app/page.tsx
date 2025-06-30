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
        name: 'A robot dancing in the desert',
        image_url: 'https://via.placeholder.com/400x300?text=Robot+Desert',
        category: 'Sci-fi',
        tags: ['Art Deco', 'Metropolis'],
        prompt:'Static close-up shot from the front:  a keyboard sculpted entirely from melted chocolate. The keys are thick, glossy, and slightly deformed from the heat, with drips sliding slowly between the rows. A woman’s fingers, nails painted in glossy cherry red, gently press each soft, sticky key. With every touch, chocolate oozes and stretches slightly. ASMR: slow finger squish, subtle suction as chocolate pulls back, and a faint wet plop with each release. The lighting is warm and highlights the deep browns and glistening texture. The tone is rich, immersive, and deeply textural. No dialogue. No subtitles.
'
      },
      {
        id: '2',
        name: 'A dreamy fantasy forest landscape',
        image_url: 'https://via.placeholder.com/400x300?text=Fantasy+Forest',
        category: 'Nature',
        tags: ['fantasy', 'nature'],
        prompt:'Frontal streamer-style close-up shot: A fluffy capybara sits at a desk softly lit with ambient RGB lighting, facing a large microphone with a fuzzy windscreen. It wears oversized headphones and is surrounded by plushies. In a calm, whispering voice, it says: ‘Close your eyes... focus on the sounds... and relax with me.’ Its little paw gently strokes a soft velvet pillow with slow, rhythmic motions. The room is dim and cozy, washed in pastel tones. ASMR: gentle brushing, whispered breathing, headphone creaks, and faint ambient hum. The camera remains still, zoomed in slightly for intimacy. Visual tone: warm, tender, deeply soothing. No subtitles'
      },
      {
        id: '3',
        name: 'Futuristic city skyline at night',
        image_url: 'https://via.placeholder.com/400x300?text=City+Night',
        category: 'Sci-fi',
        tags: ['city', 'night'],
        prompt:'Static front-facing close-up shot: A young woman’s face is framed tightly from the nose down. Her lips are painted in a deep, glossy red, shining softly under cinematic lighting. She slowly lifts a translucent,  glass-like  red strawberry to her mouth. The crystal fruit glimmers with inner light and sharp texture. As she gently bites into it, the glass strawberry cracks cleanly. ASMR: high-pitched crack, subtle shards separating, soft chewing sounds, and breathy exhale. Her lips press slowly as she chews, catching reflections. Background is softly blurred, silent except for the sounds of the fruit. Visual tone: sharp, intimate, hyperreal. No dialogue. No subtitles'
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

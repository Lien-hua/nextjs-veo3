// app/page.tsx (Next.js 13+ App Router)
'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

interface ImageData {
  id: string;
  prompt: string;
  image_url: string;
}

export default function GalleryPage() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const { data, error } = await supabase.from('images').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setImages(data);
    }
  }

  const filteredImages = images.filter(img =>
    img.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">VEO3 Prompt Gallery</h1>
      <Input
        type="text"
        placeholder="Search prompts..."
        className="mb-6"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.map(image => (
          <Card key={image.id} className="overflow-hidden rounded-2xl shadow-md">
            <img src={image.image_url} alt={image.prompt} className="w-full h-64 object-cover" />
            <CardContent className="p-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">{image.prompt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

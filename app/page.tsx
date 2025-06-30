"use client"
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateVideo = async () => {
    setLoading(true);
    setError("");
    setVideoUrl("");

    const res = await fetch("/api/veo3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (res.ok) {
      setVideoUrl(data.videoUrl);
    } else {
      setError(data.error || "Generation failed");
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center p-8 gap-4">
      <h1 className="text-2xl font-bold">🎬 VEO3 视频生成器</h1>

      <input
        type="text"
        placeholder="输入一个场景描述..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full max-w-md p-2 border rounded"
      />

      <button
        onClick={generateVideo}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading || !prompt}
      >
        {loading ? "生成中..." : "生成视频"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {videoUrl && (
        <video src={videoUrl} controls className="w-full max-w-2xl rounded shadow" />
      )}
    </main>
  );
}

"use client"
import { useState } from "react"

export default function PromptForm() {
  const [prompt, setPrompt] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/veo3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })
    const data = await res.json()
    setVideoUrl(data.videoUrl)
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="输入你的创意，例如：a panda dancing in cyberpunk city"
          className="w-full border p-2 rounded"
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "生成中..." : "生成视频"}
        </button>
      </form>

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="mt-6 w-full rounded shadow"
        />
      )}
    </div>
  )
}

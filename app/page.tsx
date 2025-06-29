import PromptForm from "@/components/PromptForm"

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 AI 视频生成（VEO3）</h1>
      <PromptForm />
    </main>
  )
}

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt, language = 'English', enableAudio = true, cameraMotion = true } = req.body

  try {
    const response = await fetch("https://your-username-veo3-api.hf.space/run/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [prompt, language, enableAudio, cameraMotion],
      }),
    })

    const result = await response.json()
    const videoUrl = result.data?.[0] || null

    res.status(200).json({ videoUrl })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to generate video" })
  }
}

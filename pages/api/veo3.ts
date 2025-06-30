import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://ginigen--VEO3-Directors.hf.space/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [prompt] }),
      }
    );

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      return res.status(500).json({ error: "Invalid Hugging Face response" });
    }

    const result = await response.json();

    if (!result?.data?.[0]) {
      console.error("Invalid response data:", result);
      return res.status(500).json({ error: "Missing video URL" });
    }

    res.status(200).json({ videoUrl: result.data[0] });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

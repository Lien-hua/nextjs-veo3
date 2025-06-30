export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://ginigen--VEO3-Directors.hf.space/run/predict",
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
      console.error("Non-JSON response from Hugging Face:", text);
      return res.status(500).json({ error: "Unexpected response from Hugging Face" });
    }

    const result = await response.json();

    if (!result?.data?.[0]) {
      console.error("Missing video URL in response:", result);
      return res.status(500).json({ error: "Invalid response format" });
    }

    res.status(200).json({ videoUrl: result.data[0] });

  } catch (error) {
    console.error("Error calling Hugging Face:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

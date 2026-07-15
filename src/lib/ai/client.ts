export async function generateAIResponse(prompt: string, systemPrompt?: string) {
  const apiKey = process.env.NVIDIA_API_KEY;
  const baseUrl = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";
  const model = process.env.NVIDIA_MODEL || "nvidia/z-ai/glm-5.2";

  if (!apiKey) {
    console.warn("NVIDIA_API_KEY is not set. Mocking response.");
    return "This is a mocked AI response because the API key is not configured.";
  }

  const messages = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content: prompt });

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`AI API Error: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

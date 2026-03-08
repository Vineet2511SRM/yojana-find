const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";

function buildPrompt(profile) {
  return `You are an expert on Indian government welfare schemes.

Citizen profile:
- State: ${profile.state}
- Gender: ${profile.gender}
- Age: ${profile.age}
- Caste: ${profile.caste}
- Income: ${profile.income}
- Categories: ${profile.categories.join(", ")}

Return ONLY a raw JSON array. No markdown. No explanation. Start directly with [.

Each object must have exactly these keys:
name, ministry, description, benefits, eligibility, tags (array of 3 strings), match ("High" or "Medium"), applyUrl

Return 6 real active Indian government schemes most relevant to this profile.`;
}

export async function fetchSchemesFromAI(profile) {
  const apiKey = process.env.REACT_APP_GROQ_KEY;

  if (!apiKey) {
    throw new Error("Groq API key missing. Add REACT_APP_GROQ_KEY to your .env file.");
  }

  const response = await fetch(GROQ_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      max_tokens: 3000,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that returns only valid JSON arrays. Always wrap your response in {\"schemes\": [...]}",
        },
        {
          role: "user",
          content: buildPrompt(profile),
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message || `HTTP ${response.status}`;
    if (response.status === 401) throw new Error("Invalid Groq API key. Check your .env file.");
    if (response.status === 429) throw new Error("Rate limit hit. Wait a moment and retry.");
    throw new Error(`Groq API Error: ${msg}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content || "";

  if (!rawText) throw new Error("Empty response from Groq. Please try again.");

  let schemes;
  try {
    const parsed = JSON.parse(rawText);
    // Groq wraps in { schemes: [...] } due to json_object mode
    schemes = parsed.schemes || parsed;
  } catch (e) {
    console.error("Raw Groq response:", rawText);
    throw new Error("Could not parse response. Please try again.");
  }

  if (!Array.isArray(schemes)) throw new Error("Response was not a list. Try again.");

  return schemes;
}

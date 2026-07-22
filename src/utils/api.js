const SCHEMES_API = "/api/schemes";

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
  const response = await fetch(SCHEMES_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error || `HTTP ${response.status}`;
    throw new Error(`Unable to fetch schemes: ${msg}`);
  }

  const data = await response.json();
  const schemes = data?.schemes;

  if (!Array.isArray(schemes)) {
    throw new Error("Response was not a list. Try again.");
  }

  return schemes;
}

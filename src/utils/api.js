const SCHEMES_API = "/api/schemes";


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

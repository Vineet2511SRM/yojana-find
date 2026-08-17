import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions';

function buildPrompt(profile) {
    return `You are an expert on Indian government welfare schemes.

Citizen profile:
- State: ${profile.state}
- Gender: ${profile.gender}
- Age: ${profile.age}
- Caste: ${profile.caste}
- Income: ${profile.income}
- Categories: ${profile.categories.join(', ')}

Provide 6 real, active Indian government schemes most relevant to this profile.
Return a valid JSON object matching this exact schema:
{
  "schemes": [
    {
      "name": "Scheme Name",
      "ministry": "Ministry Name",
      "description": "Short description of the scheme",
      "benefits": "Key benefits provided",
      "eligibility": "Eligibility criteria",
      "tags": ["Tag1", "Tag2", "Tag3"],
      "match": "High",
      "applyUrl": "https://example.gov.in"
    }
  ]
}`;
}

app.get('/health', (_req, res) => {
    res.json({ ok: true });
});

const GROQ_MODELS = [
    process.env.GROQ_MODEL,
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'qwen/qwen3.6-27b',
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
].filter(Boolean);

function cleanAndParseJSON(rawText) {
    let text = rawText.trim();
    if (text.startsWith('```json')) {
        text = text.slice(7);
    } else if (text.startsWith('```')) {
        text = text.slice(3);
    }
    if (text.endsWith('```')) {
        text = text.slice(0, -3);
    }
    text = text.trim();
    return JSON.parse(text);
}

app.post('/api/schemes', async (req, res) => {
    const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Groq API key missing. Set GROQ_API_KEY in your environment variables.' });
    }

    let lastErrorMsg = 'Groq request failed.';
    let lastStatusCode = 502;

    for (const model of GROQ_MODELS) {
        try {
            const response = await fetch(GROQ_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model,
                    temperature: 0.1,
                    max_tokens: 3000,
                    response_format: { type: 'json_object' },
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant that returns only valid JSON matching {"schemes": [...]}.',
                        },
                        {
                            role: 'user',
                            content: buildPrompt(req.body),
                        },
                    ],
                }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                const msg = err?.error?.message || `HTTP ${response.status}`;
                lastErrorMsg = msg;
                lastStatusCode = response.status;
                // If model doesn't exist, no access, or JSON validation fails with that model, try next fallback model
                if (
                    response.status === 404 ||
                    msg.toLowerCase().includes('model') ||
                    msg.toLowerCase().includes('not exist') ||
                    msg.toLowerCase().includes('access') ||
                    msg.toLowerCase().includes('validate json')
                ) {
                    console.warn(`Model ${model} failed with: "${msg}". Trying next fallback model...`);
                    continue;
                }
                return res.status(response.status).json({ error: msg });
            }

            const data = await response.json();
            const rawText = data?.choices?.[0]?.message?.content || '';

            if (!rawText) {
                lastErrorMsg = 'Empty response from Groq.';
                continue;
            }

            let schemes;
            try {
                const parsed = cleanAndParseJSON(rawText);
                schemes = parsed.schemes || (Array.isArray(parsed) ? parsed : null);
            } catch {
                lastErrorMsg = 'Could not parse response from Groq.';
                continue;
            }

            if (!Array.isArray(schemes)) {
                lastErrorMsg = 'Response was not a list.';
                continue;
            }

            return res.json({ schemes });
        } catch (error) {
            lastErrorMsg = error.message || 'Groq request failed.';
        }
    }

    return res.status(lastStatusCode).json({ error: lastErrorMsg });
});

app.listen(3001, () => {
    console.log('Server listening on http://localhost:3001');
});

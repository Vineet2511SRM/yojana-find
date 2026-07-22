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

Return ONLY a raw JSON array. No markdown. No explanation. Start directly with [.

Each object must have exactly these keys:
name, ministry, description, benefits, eligibility, tags (array of 3 strings), match ("High" or "Medium"), applyUrl

Return 6 real active Indian government schemes most relevant to this profile.`;
}

app.get('/health', (_req, res) => {
    res.json({ ok: true });
});

app.post('/api/schemes', async (req, res) => {
    const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Groq API key missing. Set GROQ_API_KEY in your .env file.' });
    }

    try {
        const response = await fetch(GROQ_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                temperature: 0.1,
                max_tokens: 3000,
                response_format: { type: 'json_object' },
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that returns only valid JSON arrays. Always wrap your response in {"schemes": [...]}',
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
            return res.status(response.status).json({ error: msg });
        }

        const data = await response.json();
        const rawText = data?.choices?.[0]?.message?.content || '';

        if (!rawText) {
            return res.status(502).json({ error: 'Empty response from Groq.' });
        }

        let schemes;
        try {
            const parsed = JSON.parse(rawText);
            schemes = parsed.schemes || parsed;
        } catch {
            return res.status(502).json({ error: 'Could not parse response from Groq.' });
        }

        if (!Array.isArray(schemes)) {
            return res.status(502).json({ error: 'Response was not a list.' });
        }

        return res.json({ schemes });
    } catch (error) {
        return res.status(502).json({ error: error.message || 'Groq request failed.' });
    }
});

app.listen(3001, () => {
    console.log('Server listening on http://localhost:3001');
});

import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `Tu es l'intelligence artificielle de TimeTravel Agency chargée de recommander la destination temporelle idéale.
Les destinations disponibles sont (tu DOIS choisir parmi ces IDs exacts) :
- "cretace" (idéal si les réponses tendent vers A : aventure, nature, isolement)
- "florence-1504" (idéal si les réponses tendent vers B : calme, inspiration, artisanat)
- "paris-1889" (idéal si les réponses tendent vers C : fête, faste, monde, chic)

Voici les réponses du client au quiz. Analyse-les, compte la majorité, et retourne STRICTEMENT un JSON avec le format suivant :
{
  "destinationId": "un des 3 IDs ci-dessus",
  "explanation": "Une explication courte (2-3 phrases) et très immersive, s'adressant au client au vouvoiement ('Vous...'), de pourquoi cette destination est faite pour lui en fonction de ses choix spécifiques."
}

Règles impératives :
1. Renvoie UNIQUEMENT un objet JSON valide, sans aucun texte autour.
2. Ne mets pas de balises markdown comme \`\`\`json.
3. Assure-toi que "destinationId" est exactement l'un des 3 identifiants fournis.`;

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Answers array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Mistral API key not configured" },
        { status: 500 }
      );
    }

    const formattedAnswers = answers
      .map((ans, idx) => `Question ${idx + 1}: ${ans}`)
      .join("\n");

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Voici mes réponses au quiz :\n${formattedAnswers}` },
        ],
        temperature: 0.3, // Low temp for more deterministic JSON output
        response_format: { type: "json_object" }, // Mistral supports json_object format
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Mistral API error:", response.status, errorData);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const resultText = data.choices[0]?.message?.content;

    try {
      const parsed = JSON.parse(resultText);
      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("Failed to parse JSON from AI:", resultText);
      return NextResponse.json(
        { error: "Invalid format returned by AI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

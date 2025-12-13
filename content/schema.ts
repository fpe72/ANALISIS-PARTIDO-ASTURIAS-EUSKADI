// content/schema.ts

export type AnalysisSection = {
  id: string;          // estable para anchors/menú
  title: string;       // título visible
  body: string;        // contenido en texto (por ahora)
};

export type MatchAnalysis = {
  meta: {
    title: string;
    dateISO: string;   // "2025-12-12"
    teams: {
      home: string;
      away: string;
    };
    competition?: string;
    location?: string;
  };

  dna: {
    summary: string;   // “ADN del partido” en una frase o párrafo
    bullets?: string[]; // puntos clave, opcional
  };

  sections: AnalysisSection[];
};


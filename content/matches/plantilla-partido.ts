// content/matches/plantilla-partido.ts
import type { AnalysisContent } from "../schema";

export const plantillaPartido: AnalysisContent = {
  title: "Análisis del partido (PLANTILLA)",
  updatedAtISO: "2025-12-17",
  sections: [
    {
      id: "resumen",
      heading: "Resumen",
      body: "Escribe aquí el resumen del partido."
    },
    {
      id: "claves",
      heading: "Claves del partido",
      body: "3-5 bullets o un párrafo con los puntos clave."
    },
    {
      id: "conclusiones",
      heading: "Conclusiones",
      body: "Conclusiones finales y siguientes mejoras."
    }
  ],
  teamDNA: {
    style: "Describe aquí el estilo del equipo.",
    defense: "Describe aquí el comportamiento defensivo.",
    strengths: ["Fortaleza 1", "Fortaleza 2", "Fortaleza 3"],
    weaknesses: ["Debilidad 1", "Debilidad 2", "Debilidad 3"]
  }
};

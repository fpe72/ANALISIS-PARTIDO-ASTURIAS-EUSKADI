// content/analysis.ts

export type AnalysisContent = {
  title: string;
  updatedAtISO: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  teamDNA: {
    style: string;
    defense: string;
    strengths: string[];
    weaknesses: string[];
  };
};

export const analysisContent: AnalysisContent = {
  title: "Análisis del partido (PR test)",
  updatedAtISO: "2025-12-13",
  sections: [
    {
      heading: "Resumen",
      body:
        "Escribe aquí el resumen. Este archivo será la zona editable y segura: cambiarlo no debe afectar al deploy."
    },
    {
      heading: "Conclusiones",
      body:
        "Escribe aquí tus conclusiones. En el siguiente paso conectaremos esto con la UI."
    }
  ],
  teamDNA: {
    style:
      "Resistencia Posicional (4-1-4-1). El plan de juego se basó en la contención espacial, renunciando a la iniciativa para minimizar la inferioridad técnica individual frente al rival.",
    defense:
      "Bloque bajo intensivo. La estructura defensiva funcionó bien durante 60 minutos gracias a la acumulación de jugadoras detrás del balón.",
    strengths: [
      "Solidaridad defensiva",
      "Orden en bloque bajo",
      "Competitividad en duelos"
    ],
    weaknesses: [
      "Salida de balón limitada",
      "Poca continuidad ofensiva",
      "Pérdidas en zonas sensibles"
    ]
  }
};


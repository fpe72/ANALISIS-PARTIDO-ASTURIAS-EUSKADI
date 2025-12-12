// content/analysis.ts

export type AnalysisContent = {
  title: string;
  updatedAtISO: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export const analysisContent: AnalysisContent = {
  title: "Análisis del partido",
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
  ]
};

// content/schema.ts

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

// content/matches/index.ts
import type { AnalysisContent } from "../schema";
import { asturiasVsEuskadi } from "./asturias-vs-euskadi";

export type MatchKey = "asturias-vs-euskadi";

export const MATCHES: Record<MatchKey, AnalysisContent> = {
  "asturias-vs-euskadi": asturiasVsEuskadi
};

export const DEFAULT_MATCH: MatchKey = "asturias-vs-euskadi";

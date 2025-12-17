import type { AnalysisContent } from "../schema";
import { asturiasVsEuskadi } from "./asturias-vs-euskadi";
import { plantillaPartido } from "./plantilla-partido";

export type MatchKey = "asturias-vs-euskadi" | "plantilla-partido";

export const DEFAULT_MATCH: MatchKey = "asturias-vs-euskadi";

export const MATCHES: Record<MatchKey, AnalysisContent> = {
  "asturias-vs-euskadi": asturiasVsEuskadi,
  "plantilla-partido": plantillaPartido,
};

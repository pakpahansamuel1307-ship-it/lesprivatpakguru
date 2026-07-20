export type SectionId = "home" | "about" | "subjects" | "classes" | "contact";

export interface SectionMeta {
  id: SectionId;
  label: string;
  index: number;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  image: string;
  glow: "periwinkle" | "mint" | "marigold";
}

export interface ClassOption {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface StatItem {
  value: string;
  label: string;
}

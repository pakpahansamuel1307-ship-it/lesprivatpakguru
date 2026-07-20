"use client";

import { useContext } from "react";
import { DeckContext } from "@/components/providers/DeckProvider";

export function useDeck() {
  return useContext(DeckContext);
}

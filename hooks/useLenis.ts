"use client";

import { useContext } from "react";
import { LenisContext } from "@/components/providers/SmoothScrollProvider";

export function useLenis() {
  return useContext(LenisContext);
}

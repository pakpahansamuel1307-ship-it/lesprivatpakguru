import { type ClassValue, clsx } from "clsx";

/** Merge conditional class names. Thin wrapper so we can swap in tailwind-merge later if needed. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

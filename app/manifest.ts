import type { MetadataRoute } from "next";
import { SITE_NAME, TEACHER } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Pak Harinuan",
    description: `${TEACHER.role} — kelas privat Matematika, Fisika, dan Kimia.`,
    start_url: "/",
    display: "standalone",
    background_color: "#FCF5EB",
    theme_color: "#FFED00",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

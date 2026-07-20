import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fredoka, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL, TEACHER } from "@/lib/constants";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${TEACHER.honorific} | ${TEACHER.role}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Kelas privat Matematika, Fisika, dan Kimia untuk siswa SMP–SMA bersama Pak Harinuan Pakpahan — pengajar berpengalaman 17+ tahun. Belajar privat, online, dengan jadwal fleksibel.",
  keywords: [
    "les privat matematika",
    "les privat fisika",
    "les privat kimia",
    "guru privat",
    "les online SMP SMA",
    "persiapan UTBK",
    "Harinuan Pakpahan",
  ],
  authors: [{ name: TEACHER.fullName }],
  creator: TEACHER.fullName,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    title: `${TEACHER.honorific} | ${TEACHER.role}`,
    description:
      "Kelas privat Matematika, Fisika, dan Kimia untuk siswa SMP–SMA. Fokus pada pemahaman konsep, bukan sekadar hafalan.",
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TEACHER.honorific} | ${TEACHER.role}`,
    description:
      "Kelas privat Matematika, Fisika, dan Kimia untuk siswa SMP–SMA. Fokus pada pemahaman konsep, bukan sekadar hafalan.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCF5EB" },
    { media: "(prefers-color-scheme: dark)", color: "#15140D" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  founder: {
    "@type": "Person",
    name: TEACHER.fullName,
    jobTitle: TEACHER.role,
  },
  url: SITE_URL,
  description:
    "Kelas privat Matematika, Fisika, dan Kimia untuk siswa SMP-SMA, serta persiapan UTBK dan Ujian Mandiri PTN.",
  areaServed: "ID",
  telephone: "+6282111399065",
  sameAs: [TEACHER.tiktokHref],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mata Pelajaran",
    itemListElement: ["Matematika", "Fisika", "Kimia"].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Course",
        name: `Les Privat ${name}`,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fredoka.variable} ${jakarta.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-cream text-ink antialiased">
        <ThemeProvider>
          <SmoothScrollProvider>
            <a
              href="#home"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
            >
              Lewati ke konten utama
            </a>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

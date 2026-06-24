import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next';
import PWARegistration from './components/pwa-registration';

export const metadata = {
  title: "LuxDevHQ - AI and Data Science Training",
  description:
    "LuxDevHQ (Lux Academy and Data Science East Africa) is a premier training institution offering hands-on courses in AI, Data Science, Analytics, and Engineering.",
  keywords: [
    "LuxDevHQ",
    "Data Science",
    "AI Training",
    "Data Engineering",
    "Machine Learning",
    "Tech Upskilling",
    "Lux Academy",
    "East Africa Tech",
  ],
  author: "LuxDevHQ Team",
  manifest: "/manifest.json",
  applicationName: "LuxDevHQ",
  appleWebApp: {
    capable: true,
    title: "LuxDevHQ",
    statusBarStyle: "default",
  },
  themeColor: "#1e3a8a",
  openGraph: {
    title: "LuxDevHQ - AI and Data Science Training",
    description:
      "Join LuxDevHQ and gain cutting-edge AI and Data Science skills. Hands-on training, real-world projects, and career mentorship.",
    url: "https://luxdevhq.ai",
    type: "website",
    images: [
      {
        url: "https://luxdevhq.ai/image-2.png",
        width: 1200,
        height: 630,
        alt: "LuxDevHQ - AI and Data Science Training",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="antialiased"
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="LuxDevHQ" />
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body>
        <PWARegistration />
        {children}
      </body>
      <GoogleAnalytics gaId="G-MH93NZF10X" />
      <Analytics />
    </html>
  );
}

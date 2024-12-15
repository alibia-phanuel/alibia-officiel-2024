// import { metadata } from "./metadata";
import { ThemeProvider } from "next-themes";
import { usePageView } from "@/hooks/usePageView";
import Script from "next/script";
import { Lora } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ReactQueryProvider from "./ReactQueryProvider";
const lora = Lora({ subsets: ["latin"] });
const GA_TRACKING_ID: string = "G-K3ZHKQSMQK"; // Remplacez par votre ID Google Analytics
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Ici, vous pouvez utiliser metadata comme vous en avez besoin */}
        <meta name="description" content="Site de commerce en ligne Alibia" />
        <title>alibia</title>
      </head>
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <NavBar />
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
            {children}
            <Footer />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

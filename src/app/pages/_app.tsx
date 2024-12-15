"use client";
// pages/_app.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import * as gtag from "../../lib/gtag";
import * as fbpixel from "../../lib/fbpixel";

const isProduction = process.env.NODE_ENV === "production";

export default function App({ Component, pageProps }: any) {
  const router = useRouter();

  useEffect(() => {
    if (!isProduction) return;

    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    const handleRouteChanges = () => {
      fbpixel.pageview();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChanges);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChanges);
    };
  }, [router.events]);

  return (
    <>
      {/* Injecter Google Analytics */}
      {isProduction && (
        <>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbpixel.FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
            }}
          />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}

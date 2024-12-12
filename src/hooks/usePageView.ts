"use client";
// src/hooks/usePageView.ts
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag"; // Assurez-vous que le fichier gtag est correctement configuré

const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url); // Envoi de la page vue à Google Analytics
    };

    // Abonnement aux événements de changement de route
    router.events.on("routeChangeComplete", handleRouteChange);

    // Nettoyage lors du démontage du composant
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]); // Réexécution du useEffect lors de tout changement de route
};

export default usePageView;

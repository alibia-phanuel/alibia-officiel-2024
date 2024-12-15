export const FB_PIXEL_ID = "1543728419655118"; // Remplacez par votre Pixel ID

// Enregistrer une page vue
export const pageview = () => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  } else {
    console.warn("Pixel Facebook non détecté");
  }
};

// Enregistrer un événement personnalisé
export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, options);
  } else {
    console.warn("Pixel Facebook non détecté");
  }
};

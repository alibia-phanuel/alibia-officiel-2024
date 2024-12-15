// lib/fbpixel.ts

export const FB_PIXEL_ID = "1543728419655118"; // Remplacez par votre Pixel ID

// Enregistrer une page vue
export const pageview = () => {
  window.fbq("track", "PageView");
};

// Enregistrer un événement personnalisé
export const event = (name: string, options: Record<string, any> = {}) => {
  window.fbq("track", name, options);
};

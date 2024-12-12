export const GA_TRACKING_ID: string = "G-K3ZHKQSMQK"; // Remplacez par votre ID Google Analytics

// Déclare l'objet `gtag` pour éviter les erreurs Ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Envoie une page vue
export const pageview = (url: string): void => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Types pour les paramètres d'événement
interface EventParams {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

// Envoie un événement personnalisé
export const event = ({
  action,
  category,
  label,
  value,
}: EventParams): void => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

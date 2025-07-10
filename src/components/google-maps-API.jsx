import { useEffect } from "react";

export default function useGoogleMapsLoader(apiKey) {
  useEffect(() => {
    if (window.google?.maps?.places?.AutocompleteSuggestion) return;

    const scriptId = "google-maps-api";

    if (document.getElementById(scriptId)) return; // Already added

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
    script.async = true;
    script.onerror = () => {
      console.error("Failed to load Google Maps JavaScript API.");
    };
    document.head.appendChild(script);
  }, [apiKey]);
}


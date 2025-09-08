import { useState, useEffect } from "react";

// Language mapping based on Indian states
const stateLanguageMap: Record<string, string> = {
  "punjab": "pa", // Punjabi
  "haryana": "hi", // Hindi
  "uttar pradesh": "hi", // Hindi
  "bihar": "hi", // Hindi
  "west bengal": "bn", // Bengali
  "odisha": "hi", // Hindi (Odia not available in our list)
  "maharashtra": "mr", // Marathi
  "gujarat": "gu", // Gujarati
  "rajasthan": "hi", // Hindi
  "madhya pradesh": "hi", // Hindi
  "karnataka": "hi", // Hindi (Kannada not available)
  "andhra pradesh": "te", // Telugu
  "telangana": "te", // Telugu
  "tamil nadu": "ta", // Tamil
  "kerala": "hi", // Hindi (Malayalam not available)
  "assam": "hi", // Hindi (Assamese not available)
  "jharkhand": "hi", // Hindi
  "chhattisgarh": "hi", // Hindi
  "himachal pradesh": "hi", // Hindi
  "uttarakhand": "hi", // Hindi
  "goa": "hi", // Hindi
  "manipur": "hi", // Hindi
  "meghalaya": "en", // English
  "mizoram": "en", // English
  "nagaland": "en", // English
  "sikkim": "hi", // Hindi
  "tripura": "hi", // Hindi
  "arunachal pradesh": "hi", // Hindi
  "delhi": "hi", // Hindi
};

export function useLocationLanguage() {
  const [detectedLanguage, setDetectedLanguage] = useState<string>('hi'); // Default to Hindi
  const [location, setLocation] = useState<string>('India');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectLocationAndLanguage = async () => {
      try {
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Use reverse geocoding to get location details
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
                );
                const data = await response.json();
                
                if (data.principalSubdivision) {
                  const state = data.principalSubdivision.toLowerCase();
                  const country = data.countryName || 'India';
                  
                  setLocation(`${data.principalSubdivision}, ${country}`);
                  
                  // Map state to language
                  const mappedLanguage = stateLanguageMap[state] || 'hi';
                  setDetectedLanguage(mappedLanguage);
                } else {
                  // Fallback to IP-based detection
                  await detectByIP();
                }
              } catch (error) {
                console.error('Reverse geocoding failed:', error);
                await detectByIP();
              } finally {
                setIsLoading(false);
              }
            },
            async (error) => {
              console.error('Geolocation failed:', error);
              await detectByIP();
            },
            {
              timeout: 10000,
              enableHighAccuracy: false
            }
          );
        } else {
          await detectByIP();
        }
      } catch (error) {
        console.error('Location detection failed:', error);
        setIsLoading(false);
      }
    };

    const detectByIP = async () => {
      try {
        // Fallback to IP-based location detection
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.region && data.country_name) {
          const state = data.region.toLowerCase();
          setLocation(`${data.region}, ${data.country_name}`);
          
          // Map state to language
          const mappedLanguage = stateLanguageMap[state] || 'hi';
          setDetectedLanguage(mappedLanguage);
        }
      } catch (error) {
        console.error('IP-based detection failed:', error);
        // Keep default values
      } finally {
        setIsLoading(false);
      }
    };

    detectLocationAndLanguage();
  }, []);

  return {
    detectedLanguage,
    location,
    isLoading
  };
}

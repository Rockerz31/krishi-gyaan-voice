import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sprout, 
  Shield, 
  User, 
  UserPlus, 
  MapPin,
  Wheat,
  TreePine,
  Leaf,
  Sun,
  CloudRain
} from "lucide-react";
import { getTranslation } from "@/utils/translations";

interface LandingProps {
  onAuthClick: (type: 'login' | 'register') => void;
  selectedLanguage: string;
}

export function Landing({ onAuthClick, selectedLanguage }: LandingProps) {
  const [currentLocation, setCurrentLocation] = useState("India");

  useEffect(() => {
    // Get user's location for display
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // You can use position.coords to get more specific location data
        setCurrentLocation("Punjab, India");
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-primary-foreground" />
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">FarmWise AI</h1>
              <p className="text-sm text-primary-foreground/80">
                कृषि मित्र - Government of India Initiative
              </p>
              <p className="text-xs text-primary-foreground/70">भारत सरकार की पहल</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onAuthClick('login')}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <User className="h-4 w-4" />
              Login / लॉगिन
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onAuthClick('register')}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <UserPlus className="h-4 w-4" />
              Register / पंजीकरण
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-primary-foreground/80" />
            <span className="text-primary-foreground/80">Location: {currentLocation}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Welcome Farmer
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            आपका स्वागत है किसान भाई
          </p>
          
          <Card className="max-w-md mx-auto bg-primary-foreground/95 shadow-glow animate-slide-up">
            <CardContent className="p-8">
              <div className="flex justify-center gap-3 mb-6">
                <Wheat className="h-12 w-12 text-primary animate-pulse-glow" />
                <Sprout className="h-12 w-12 text-crop animate-pulse-glow" />
                <TreePine className="h-12 w-12 text-earth animate-pulse-glow" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-4">
                {getTranslation('appTitle', selectedLanguage)}
              </h3>
              <p className="text-muted-foreground mb-6">
                {getTranslation('aiPoweredAdvice', selectedLanguage)}
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => onAuthClick('login')}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <User className="h-5 w-5" />
                  Login / लॉगिन करें
                </Button>
                <Button 
                  onClick={() => onAuthClick('register')}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <UserPlus className="h-5 w-5" />
                  Register / पंजीकरण करें
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-primary-foreground/90 border-0 shadow-card animate-slide-up">
            <CardContent className="p-6 text-center">
              <Leaf className="h-16 w-16 text-crop mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Crop Health</h3>
              <p className="text-muted-foreground">फसल स्वास्थ्य</p>
              <p className="text-sm text-muted-foreground mt-2">
                AI-powered disease detection and health monitoring
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary-foreground/90 border-0 shadow-card animate-slide-up delay-100">
            <CardContent className="p-6 text-center">
              <Sun className="h-16 w-16 text-sky mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Weather Insights</h3>
              <p className="text-muted-foreground">मौसम जानकारी</p>
              <p className="text-sm text-muted-foreground mt-2">
                Real-time weather data and farming recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary-foreground/90 border-0 shadow-card animate-slide-up delay-200">
            <CardContent className="p-6 text-center">
              <CloudRain className="h-16 w-16 text-earth mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Soil Monitoring</h3>
              <p className="text-muted-foreground">मिट्टी निगरानी</p>
              <p className="text-sm text-muted-foreground mt-2">
                Advanced soil analysis and fertility recommendations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 rounded-full text-primary-foreground/80 mb-4">
            <div className="w-3 h-3 bg-crop rounded-full animate-pulse"></div>
            <span>Auto-detected: Hindi / हिंदी</span>
          </div>
          
          <p className="text-primary-foreground/80 text-lg">
            Join thousands of farmers already using FarmWise AI
          </p>
          <p className="text-primary-foreground/60">
            हजारों किसानों के साथ FarmWise AI का उपयोग करें
          </p>
        </div>
      </main>
    </div>
  );
}
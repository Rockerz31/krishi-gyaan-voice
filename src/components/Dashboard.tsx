import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  MessageCircle, 
  Camera, 
  BarChart3, 
  User, 
  Globe, 
  Sun, 
  CloudRain,
  Leaf,
  TrendingUp,
  Award,
  Sprout
} from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { DiseaseDetection } from "@/components/DiseaseDetection";
import { SoilMonitoring } from "@/components/SoilMonitoring";
import { WeatherWidget } from "@/components/WeatherWidget";
import { Profile } from "@/components/Profile";
import { languages, getTranslation } from "@/utils/translations";
import farmerHero from "@/assets/farmer-hero.jpg";

type DashboardSection = 'home' | 'chat' | 'disease' | 'soil' | 'profile';

export function Dashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('home');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatInterface language={selectedLanguage} />;
      case 'disease':
        return <DiseaseDetection language={selectedLanguage} />;
      case 'soil':
        return <SoilMonitoring language={selectedLanguage} />;
      case 'profile':
        return <Profile language={selectedLanguage} />;
      default:
        return <HomeSection language={selectedLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">{getTranslation('appTitle', selectedLanguage)}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-1 text-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              
              <Button variant="crop" size="sm">
                <Globe className="h-4 w-4" />
                Switch Language
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
          {/* Sidebar Navigation */}
          <div className="xl:col-span-1">
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary text-lg">{getTranslation('navigation', selectedLanguage)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <Button 
                  variant={activeSection === 'home' ? 'hero' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveSection('home')}
                >
                  <Home className="h-4 w-4" />
                  {getTranslation('home', selectedLanguage)}
                </Button>
                <Button 
                  variant={activeSection === 'chat' ? 'hero' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveSection('chat')}
                >
                  <MessageCircle className="h-4 w-4" />
                  {getTranslation('aiAssistant', selectedLanguage)}
                </Button>
                <Button 
                  variant={activeSection === 'disease' ? 'hero' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveSection('disease')}
                >
                  <Camera className="h-4 w-4" />
                  {getTranslation('diseaseDetection', selectedLanguage)}
                </Button>
                <Button 
                  variant={activeSection === 'soil' ? 'hero' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveSection('soil')}
                >
                  <BarChart3 className="h-4 w-4" />
                  {getTranslation('soilMonitoring', selectedLanguage)}
                </Button>
                <Button 
                  variant={activeSection === 'profile' ? 'hero' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveSection('profile')}
                >
                  <User className="h-4 w-4" />
                  {getTranslation('profile', selectedLanguage)}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeSection({ language }: { language: string }) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="overflow-hidden shadow-card">
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-nature">
          <img 
            src={farmerHero} 
            alt="Modern farming with technology" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 text-primary-foreground">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                {getTranslation('cropHealthPriority', language)}
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 max-w-2xl">
                {getTranslation('aiPoweredAdvice', language)}
              </p>
              <Button variant="hero" size="lg">
                <MessageCircle className="h-5 w-5" />
                {getTranslation('getAdviceNow', language)}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="shadow-soft border-l-4 border-l-crop">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-crop-foreground font-semibold text-sm sm:text-base">{getTranslation('healthyCrops', language)}</p>
                <p className="text-xl sm:text-2xl font-bold text-crop">85%</p>
              </div>
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-crop" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-l-4 border-l-earth">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-earth-foreground font-semibold text-sm sm:text-base">{getTranslation('soilHealth', language)}</p>
                <p className="text-xl sm:text-2xl font-bold text-earth">{getTranslation('good', language)}</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-earth" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground font-semibold text-sm sm:text-base">{getTranslation('achievement', language)}</p>
                <p className="text-xl sm:text-2xl font-bold text-primary">★ 4.8</p>
              </div>
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <WeatherWidget language={language} />
        
        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-primary text-lg">
              {getTranslation('quickActions', language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <Button variant="earth" className="w-full justify-start">
              <Camera className="h-4 w-4" />
              {getTranslation('takeCropPhoto', language)}
            </Button>
            <Button variant="sky" className="w-full justify-start">
              <BarChart3 className="h-4 w-4" />
              {getTranslation('soilHealth', language)}
            </Button>
            <Button variant="crop" className="w-full justify-start">
              <MessageCircle className="h-4 w-4" />
              {getTranslation('askForAdvice', language)}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
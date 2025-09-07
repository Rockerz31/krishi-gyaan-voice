import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Droplets, Zap, Beaker, TrendingUp, Wifi, WifiOff } from "lucide-react";

export function SoilMonitoring({ language }: { language: string }) {
  const soilData = {
    ph: 6.8,
    nitrogen: 45,
    phosphorus: 32,
    potassium: 28,
    moisture: 65,
    temperature: 24,
    conductivity: 1.2,
    lastUpdated: new Date().toLocaleString()
  };

  const getPhStatus = (ph: number) => {
    if (ph < 6) return { status: language === 'hi' ? 'अम्लीय' : 'Acidic', color: 'text-destructive' };
    if (ph > 8) return { status: language === 'hi' ? 'क्षारीय' : 'Alkaline', color: 'text-earth' };
    return { status: language === 'hi' ? 'आदर्श' : 'Optimal', color: 'text-crop' };
  };

  const getNutrientStatus = (value: number) => {
    if (value < 30) return { status: language === 'hi' ? 'कम' : 'Low', color: 'text-destructive' };
    if (value > 70) return { status: language === 'hi' ? 'अधिक' : 'High', color: 'text-crop' };
    return { status: language === 'hi' ? 'मध्यम' : 'Medium', color: 'text-earth' };
  };

  const phStatus = getPhStatus(soilData.ph);
  const nStatus = getNutrientStatus(soilData.nitrogen);
  const pStatus = getNutrientStatus(soilData.phosphorus);
  const kStatus = getNutrientStatus(soilData.potassium);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-sky text-sky-foreground">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {language === 'hi' ? 'मिट्टी की निगरानी' : 'Soil Monitoring'}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wifi className="h-4 w-4" />
              {language === 'hi' ? 'कनेक्टेड' : 'Connected'}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              {language === 'hi' ? 'अंतिम अपडेट:' : 'Last Updated:'} {soilData.lastUpdated}
            </p>
            <Button variant="hero" className="mt-4">
              {language === 'hi' ? 'डेटा रिफ्रेश करें' : 'Refresh Data'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* pH Level */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Beaker className="h-4 w-4 text-primary" />
              {language === 'hi' ? 'pH स्तर' : 'pH Level'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{soilData.ph}</div>
              <div className={`text-sm font-medium ${phStatus.color}`}>
                {phStatus.status}
              </div>
              <Progress value={(soilData.ph / 14) * 100} className="mt-3" />
            </div>
          </CardContent>
        </Card>

        {/* Moisture */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Droplets className="h-4 w-4 text-sky" />
              {language === 'hi' ? 'नमी' : 'Moisture'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-sky mb-2">{soilData.moisture}%</div>
              <div className="text-sm font-medium text-crop">
                {language === 'hi' ? 'अच्छा' : 'Good'}
              </div>
              <Progress value={soilData.moisture} className="mt-3" />
            </div>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-earth" />
              {language === 'hi' ? 'तापमान' : 'Temperature'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-earth mb-2">{soilData.temperature}°C</div>
              <div className="text-sm font-medium text-crop">
                {language === 'hi' ? 'सामान्य' : 'Normal'}
              </div>
              <Progress value={(soilData.temperature / 40) * 100} className="mt-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NPK Levels */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">
            {language === 'hi' ? 'NPK पोषक तत्व स्तर' : 'NPK Nutrient Levels'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nitrogen */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">
                  {language === 'hi' ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'}
                </label>
                <span className={`text-sm font-medium ${nStatus.color}`}>
                  {nStatus.status}
                </span>
              </div>
              <Progress value={soilData.nitrogen} className="h-2" />
              <div className="text-right text-sm text-muted-foreground">
                {soilData.nitrogen} ppm
              </div>
            </div>

            {/* Phosphorus */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">
                  {language === 'hi' ? 'फास्फोरस (P)' : 'Phosphorus (P)'}
                </label>
                <span className={`text-sm font-medium ${pStatus.color}`}>
                  {pStatus.status}
                </span>
              </div>
              <Progress value={soilData.phosphorus} className="h-2" />
              <div className="text-right text-sm text-muted-foreground">
                {soilData.phosphorus} ppm
              </div>
            </div>

            {/* Potassium */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">
                  {language === 'hi' ? 'पोटेशियम (K)' : 'Potassium (K)'}
                </label>
                <span className={`text-sm font-medium ${kStatus.color}`}>
                  {kStatus.status}
                </span>
              </div>
              <Progress value={soilData.potassium} className="h-2" />
              <div className="text-right text-sm text-muted-foreground">
                {soilData.potassium} ppm
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-card border-l-4 border-l-crop">
        <CardHeader>
          <CardTitle className="text-crop">
            {language === 'hi' ? 'सिफारिशें' : 'Recommendations'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'hi' ? 'उर्वरक सुझाव:' : 'Fertilizer Suggestion:'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' ? 
                  'NPK (12:32:16) उर्वरक का उपयोग करें। फास्फोरस बढ़ाने के लिए DAP मिलाएं।' :
                  'Use NPK (12:32:16) fertilizer. Add DAP to increase phosphorus levels.'
                }
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">
                {language === 'hi' ? 'सिंचाई सलाह:' : 'Irrigation Advice:'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' ? 
                  'मिट्टी में नमी अच्छी है। 2-3 दिन बाद सिंचाई करें।' :
                  'Soil moisture is good. Water after 2-3 days.'
                }
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="earth" className="flex-1">
                <Zap className="h-4 w-4 mr-2" />
                {language === 'hi' ? 'उर्वरक ऑर्डर करें' : 'Order Fertilizer'}
              </Button>
              <Button variant="sky" className="flex-1">
                <BarChart3 className="h-4 w-4 mr-2" />
                {language === 'hi' ? 'रिपोर्ट डाउनलोड करें' : 'Download Report'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
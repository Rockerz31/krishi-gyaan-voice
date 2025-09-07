import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, X, CheckCircle, AlertTriangle } from "lucide-react";

export function DiseaseDetection({ language }: { language: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult = {
        disease: language === 'hi' ? 'पत्ती का धब्बा रोग (Leaf Spot)' : 'Leaf Spot Disease',
        confidence: 85,
        severity: 'moderate',
        treatment: language === 'hi' ? {
          medicine: 'मैंकोजेब 75% WP',
          dosage: '2 ग्राम प्रति लीटर पानी',
          application: 'सुबह या शाम के समय छिड़काव करें',
          frequency: '10-15 दिन के अंतराल पर दो बार',
          precautions: ['बारिश से पहले छिड़काव न करें', 'सुरक्षा उपकरण पहनें', 'फसल कटाई से 15 दिन पहले रोकें']
        } : {
          medicine: 'Mancozeb 75% WP',
          dosage: '2g per liter of water',
          application: 'Spray during morning or evening',
          frequency: 'Two times with 10-15 days interval',
          precautions: ['Don\'t spray before rain', 'Wear safety equipment', 'Stop 15 days before harvest']
        }
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-earth text-earth-foreground">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {language === 'hi' ? 'रोग पहचान' : 'Disease Detection'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {!selectedImage ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'hi' ? 'फसल की तस्वीर अपलोड करें' : 'Upload Crop Photo'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'hi' ? 
                    'पत्ती या पौधे की स्पष्ट तस्वीर लें' : 
                    'Take a clear photo of leaves or plant'
                  }
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button 
                  variant="earth" 
                  onClick={() => fileInputRef.current?.click()}
                  className="mr-2"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {language === 'hi' ? 'फाइल चुनें' : 'Choose File'}
                </Button>
                <Button variant="sky">
                  <Camera className="h-4 w-4 mr-2" />
                  {language === 'hi' ? 'कैमरा खोलें' : 'Open Camera'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded crop" 
                    className="w-full h-64 object-contain bg-muted rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={resetAnalysis}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {!analysisResult && (
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {language === 'hi' ? 'विश्लेषण हो रहा है...' : 'Analyzing...'}
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        {language === 'hi' ? 'रोग की जांच करें' : 'Detect Disease'}
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {analysisResult && (
        <Card className="shadow-card border-l-4 border-l-crop">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-crop">
              <CheckCircle className="h-5 w-5" />
              {language === 'hi' ? 'विश्लेषण परिणाम' : 'Analysis Result'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{analysisResult.disease}</h4>
                <span className="bg-crop text-crop-foreground px-2 py-1 rounded text-sm">
                  {analysisResult.confidence}% {language === 'hi' ? 'सटीक' : 'Accurate'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-earth" />
                <span className="text-earth font-medium">
                  {language === 'hi' ? 'मध्यम गंभीरता' : 'Moderate Severity'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {language === 'hi' ? 'दवा की जानकारी' : 'Medicine Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="font-semibold text-sm">
                      {language === 'hi' ? 'दवा:' : 'Medicine:'}
                    </label>
                    <p>{analysisResult.treatment.medicine}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-sm">
                      {language === 'hi' ? 'मात्रा:' : 'Dosage:'}
                    </label>
                    <p>{analysisResult.treatment.dosage}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-sm">
                      {language === 'hi' ? 'छिड़काव समय:' : 'Application:'}
                    </label>
                    <p>{analysisResult.treatment.application}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-sm">
                      {language === 'hi' ? 'दोहराव:' : 'Frequency:'}
                    </label>
                    <p>{analysisResult.treatment.frequency}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {language === 'hi' ? 'सावधानियां' : 'Precautions'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.treatment.precautions.map((precaution: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-crop mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-2">
              <Button variant="hero" className="flex-1">
                {language === 'hi' ? 'सलाह सेव करें' : 'Save Advice'}
              </Button>
              <Button variant="sky" className="flex-1">
                {language === 'hi' ? 'दुकान खोजें' : 'Find Store'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
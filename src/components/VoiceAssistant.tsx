import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MessageCircle,
  X,
  Sparkles
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoiceAssistantProps {
  selectedLanguage: string;
}

export function VoiceAssistant({ selectedLanguage }: VoiceAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
        
        recognitionRef.current.onresult = (event) => {
          const result = event.results[event.results.length - 1];
          setTranscript(result[0].transcript);
          
          if (result.isFinal) {
            handleVoiceQuery(result[0].transcript);
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description: "Please try again or check your microphone permissions",
            variant: "destructive",
          });
        };

        setIsRecognitionSupported(true);
      }
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [selectedLanguage, toast]);

  const handleVoiceQuery = (query: string) => {
    if (!query.trim()) return;

    // Simple AI responses based on keywords
    let response = getAIResponse(query, selectedLanguage);
    speakResponse(response);
  };

  const getAIResponse = (query: string, language: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (language === 'hi') {
      if (lowerQuery.includes('मौसम') || lowerQuery.includes('weather')) {
        return "आज मौसम अच्छा है। तापमान 25 डिग्री है और हल्की बारिश की संभावना है।";
      } else if (lowerQuery.includes('फसल') || lowerQuery.includes('crop')) {
        return "आपकी फसल स्वस्थ दिख रही है। नियमित पानी देते रहें और कीट-पतंगों पर नजर रखें।";
      } else if (lowerQuery.includes('मिट्टी') || lowerQuery.includes('soil')) {
        return "मिट्टी की जांच के लिए, सबसे पहले मिट्टी का पीएच लेवल चेक करें। अच्छी फसल के लिए 6 से 7 पीएच बेहतर होता है।";
      } else {
        return "मैं कृषि मित्र हूं। मैं आपको खेती-बाड़ी, मौसम, फसल और मिट्टी की जानकारी दे सकता हूं। आप क्या जानना चाहते हैं?";
      }
    } else {
      if (lowerQuery.includes('weather')) {
        return "The weather today is pleasant with 25 degrees temperature and slight chance of rain.";
      } else if (lowerQuery.includes('crop') || lowerQuery.includes('plant')) {
        return "Your crops look healthy. Keep watering regularly and monitor for pests.";
      } else if (lowerQuery.includes('soil')) {
        return "For soil testing, first check the pH level. A pH between 6 to 7 is ideal for most crops.";
      } else if (lowerQuery.includes('help') || lowerQuery.includes('assistant')) {
        return "I'm Krishi Mitra, your farming assistant. I can help you with weather, crops, soil information, and farming tips. What would you like to know?";
      } else {
        return "I'm your farming assistant. I can help you with weather, crops, soil, and farming guidance. What would you like to know?";
      }
    }
  };

  const speakResponse = (text: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current || !isRecognitionSupported) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    setTranscript("");
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Voice Assistant Button - Always Visible */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-card hover:scale-110 transition-all duration-300"
        size="icon"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 animate-pulse" />
        </div>
      </Button>

      {/* Voice Assistant Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-md bg-card shadow-glow animate-slide-up">
            <div className="bg-gradient-primary text-primary-foreground p-4 rounded-t-lg relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute right-2 top-2 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <MessageCircle className="h-8 w-8" />
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Krishi Mitra</h3>
                  <p className="text-sm opacity-90">कृषि मित्र - AI Voice Assistant</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="text-center space-y-4">
                {transcript && (
                  <div className="bg-muted p-3 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground">You said:</p>
                    <p className="font-medium">{transcript}</p>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  {!isListening ? (
                    <Button
                      onClick={startListening}
                      className="bg-primary hover:bg-primary/90"
                      size="lg"
                      disabled={!isRecognitionSupported}
                    >
                      <Mic className="h-5 w-5 mr-2" />
                      Start Voice Chat
                    </Button>
                  ) : (
                    <Button
                      onClick={stopListening}
                      variant="destructive"
                      size="lg"
                      className="animate-pulse-glow"
                    >
                      <MicOff className="h-5 w-5 mr-2" />
                      Stop Listening
                    </Button>
                  )}

                  {isSpeaking && (
                    <Button
                      onClick={stopSpeaking}
                      variant="outline"
                      size="lg"
                    >
                      <VolumeX className="h-5 w-5 mr-2" />
                      Stop Speaking
                    </Button>
                  )}
                </div>

                {isListening && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-primary animate-pulse">
                      <Volume2 className="h-4 w-4" />
                      <span>Listening...</span>
                    </div>
                  </div>
                )}

                {isSpeaking && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-primary animate-pulse">
                      <Volume2 className="h-4 w-4" />
                      <span>Speaking...</span>
                    </div>
                  </div>
                )}

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Ask me about:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>• Weather / मौसम</div>
                    <div>• Crops / फसल</div>
                    <div>• Soil / मिट्टी</div>
                    <div>• Farming Tips / खेती</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
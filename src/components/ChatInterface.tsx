import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Mic, MicOff, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatInterface({ language }: { language: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: language === 'hi' ? 
        'नमस्ते! मैं आपका AI कृषि सहायक हूं। आप मुझसे फसल, बीमारी, उर्वरक और मौसम के बारे में कुछ भी पूछ सकते हैं।' :
        'Hello! I\'m your AI farming assistant. You can ask me anything about crops, diseases, fertilizers, and weather.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = language === 'hi' ? [
    'मेरी गेहूं की फसल में कौन सा रोग है?',
    'मिट्टी के लिए कौन सा उर्वरक अच्छा है?',
    'इस मौसम में कौन सी फसल लगाएं?',
    'कीट प्रबंधन कैसे करें?'
  ] : [
    'What disease is affecting my wheat crop?',
    'Which fertilizer is good for my soil?',
    'What crop should I plant this season?',
    'How to manage pest control?'
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message, language);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (!SpeechRecognition) {
      alert(language === 'hi' ? 'आवाज पहचान इस ब्राउज़र में समर्थित नहीं है' : 'Voice recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };
    
    recognition.start();
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {language === 'hi' ? 'AI कृषि सहायक' : 'AI Farming Assistant'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-crop text-crop-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-crop flex items-center justify-center">
                      <User className="h-4 w-4 text-crop-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={language === 'hi' ? 'अपना सवाल लिखें...' : 'Type your question...'}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                className="flex-1"
              />
              <Button
                variant={isListening ? 'destructive' : 'sky'}
                size="icon"
                onClick={handleVoiceInput}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button 
                variant="hero" 
                size="icon"
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Questions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-primary">
            {language === 'hi' ? 'सामान्य प्रश्न' : 'Common Questions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto p-3"
                onClick={() => handleSendMessage(question)}
              >
                <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function generateBotResponse(message: string, language: string): string {
  const responses = language === 'hi' ? {
    disease: 'आपकी फसल में संभावित बीमारी है। कृपया पत्ती की तस्वीर अपलोड करें। इस बीच, नीम का तेल छिड़कें और जल प्रबंधन सुधारें।',
    fertilizer: 'आपकी मिट्टी के लिए NPK (10:26:26) उर्वरक अच्छा होगा। प्रति एकड़ 50 किलो दें। साथ में वर्मी कंपोस्ट भी मिलाएं।',
    weather: 'अगले 7 दिन बारिश की संभावना है। फंगल बीमारी से बचने के लिए फंगीसाइड का छिड़काव करें।',
    crop: 'इस मौसम में गेहूं, सरसों या चना लगा सकते हैं। मिट्टी की जांच कराकर किस्म चुनें।',
    default: 'मैं आपकी मदद करने के लिए यहां हूं। कृपया अपनी समस्या विस्तार से बताएं या तस्वीर भेजें।'
  } : {
    disease: 'Your crop might have a disease. Please upload a leaf photo for accurate diagnosis. Meanwhile, spray neem oil and improve water management.',
    fertilizer: 'For your soil, NPK (10:26:26) fertilizer would be good. Apply 50kg per acre along with vermicompost for better results.',
    weather: 'Rain is expected in the next 7 days. Apply fungicide spray to prevent fungal diseases in your crops.',
    crop: 'This season you can plant wheat, mustard, or chickpea. Choose variety based on your soil test results.',
    default: 'I\'m here to help you with your farming needs. Please describe your problem in detail or share a photo.'
  };

  const msg = message.toLowerCase();
  if (msg.includes('disease') || msg.includes('रोग') || msg.includes('बीमारी')) {
    return responses.disease;
  } else if (msg.includes('fertilizer') || msg.includes('उर्वरक') || msg.includes('खाद')) {
    return responses.fertilizer;
  } else if (msg.includes('weather') || msg.includes('मौसम') || msg.includes('बारिश')) {
    return responses.weather;
  } else if (msg.includes('crop') || msg.includes('फसल') || msg.includes('seed')) {
    return responses.crop;
  }
  return responses.default;
}
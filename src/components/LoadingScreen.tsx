import { useEffect, useState } from "react";
import { Sprout, Wheat, TreePine } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("I am Krishi Mitra, your friend...");

  useEffect(() => {
    const messages = [
      "I am Krishi Mitra, your friend...",
      "मैं कृषि मित्र हूं, आपका दोस्त...",
      "Initializing AI Assistant...",
      "Loading weather data...",
      "Preparing crop analysis...",
      "Setting up your dashboard...",
      "Almost ready..."
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        // Update message based on progress
        const messageIndex = Math.floor((newProgress / 100) * (messages.length - 1));
        setMessage(messages[messageIndex]);
        
        return newProgress;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-primary flex items-center justify-center z-50">
      <div className="text-center animate-fade-in">
        {/* Logo and Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="animate-spin-slow">
            <Sprout className="h-16 w-16 text-primary-foreground" />
          </div>
          <div className="animate-pulse-glow">
            <Wheat className="h-16 w-16 text-primary-foreground" />
          </div>
          <div className="animate-spin-slow" style={{ animationDelay: '1s' }}>
            <TreePine className="h-16 w-16 text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
          FarmWise AI
        </h1>
        <p className="text-xl text-primary-foreground/90 mb-12">
          कृषि मित्र
        </p>

        {/* Loading Message */}
        <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-md mx-auto animate-pulse-glow">
          <div className="flex justify-center gap-1 mb-4">
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
          <p className="text-primary-foreground text-lg font-medium">
            {message}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-primary-foreground/20 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-foreground to-crop h-full rounded-full transition-all duration-300 ease-out animate-loading-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-primary-foreground/80 text-sm">
            {Math.round(progress)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
}
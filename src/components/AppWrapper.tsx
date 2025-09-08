import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { Landing } from "@/pages/Landing";
import { AuthModal } from "@/components/AuthModal";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Dashboard } from "@/components/Dashboard";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { useLocationLanguage } from "@/hooks/useLocationLanguage";
import { useToast } from "@/components/ui/use-toast";

type AppState = 'landing' | 'auth' | 'loading' | 'dashboard';

export function AppWrapper() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  
  const { detectedLanguage, location, isLoading: locationLoading } = useLocationLanguage();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && appState !== 'dashboard') {
          setAppState('loading');
        } else if (!session?.user && appState === 'dashboard') {
          setAppState('landing');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setAppState('loading');
      }
    });

    return () => subscription.unsubscribe();
  }, [appState]);

  useEffect(() => {
    // Auto-set language based on location detection
    if (!locationLoading && detectedLanguage) {
      setSelectedLanguage(detectedLanguage);
      
      // Show toast about auto-detected language
      setTimeout(() => {
        toast({
          title: "Language Auto-Detected",
          description: `Language set to local preference based on your location: ${location}`,
        });
      }, 2000);
    }
  }, [detectedLanguage, location, locationLoading, toast]);

  const handleAuthClick = (type: 'login' | 'register') => {
    setAuthType(type);
    setAppState('auth');
  };

  const handleAuthSuccess = () => {
    setAppState('loading');
  };

  const handleLoadingComplete = () => {
    setAppState('dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAppState('landing');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  if (locationLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mx-auto mb-4" />
          <p className="text-primary-foreground">Detecting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {appState === 'landing' && (
        <Landing 
          onAuthClick={handleAuthClick}
          selectedLanguage={selectedLanguage}
        />
      )}

      {appState === 'auth' && (
        <AuthModal
          isOpen={true}
          onClose={() => setAppState('landing')}
          initialTab={authType}
          onSuccess={handleAuthSuccess}
          selectedLanguage={selectedLanguage}
        />
      )}

      {appState === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {appState === 'dashboard' && (
        <>
          <Dashboard 
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onLogout={handleLogout}
            user={user}
          />
          <VoiceAssistant selectedLanguage={selectedLanguage} />
        </>
      )}
    </>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  Sprout, 
  Shield, 
  Phone, 
  Lock, 
  Mail,
  User,
  MapPin,
  Globe
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'login' | 'register';
  onSuccess: () => void;
  selectedLanguage: string;
}

export function AuthModal({ isOpen, onClose, initialTab, onSuccess, selectedLanguage }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    name: '',
    location: 'Punjab, India'
  });
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back, farmer!",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: formData.name,
            phone: formData.phone,
            location: formData.location
          }
        }
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <defs>
              <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(134,195,85);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgb(102,153,51);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(85,136,34);stop-opacity:1" />
              </linearGradient>
              <pattern id="crops" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="none"/>
                <path d="M20,50 Q30,30 40,50 Q50,70 60,50 Q70,30 80,50" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/>
                <circle cx="25" cy="45" r="2" fill="rgba(255,255,255,0.15)"/>
                <circle cx="45" cy="55" r="2" fill="rgba(255,255,255,0.15)"/>
                <circle cx="65" cy="45" r="2" fill="rgba(255,255,255,0.15)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bg)"/>
            <rect width="100%" height="100%" fill="url(#crops)"/>
          </svg>
        `)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border border-primary/20 shadow-glow animate-slide-up">
        <CardHeader className="relative bg-gradient-primary text-primary-foreground rounded-t-lg">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8" />
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">FarmWise AI</CardTitle>
              <p className="text-sm opacity-90">कृषि मित्र - Government of India Initiative</p>
              <p className="text-xs opacity-75">भारत सरकार की पहल</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm opacity-90">
            <MapPin className="h-4 w-4" />
            <span>Location: Punjab, India</span>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2">Welcome Farmer</h2>
            <p className="text-muted-foreground">आपका स्वागत है किसान भाई</p>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" onClick={() => setActiveTab('login')}>Login / लॉगिन</TabsTrigger>
              <TabsTrigger value="register" onClick={() => setActiveTab('register')}>Register / पंजीकरण</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email / ईमेल</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password / पासवर्ड</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Logging in...
                    </div>
                  ) : (
                    "Login / लॉगिन करें"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name / पूरा नाम</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-phone">Phone Number / फोन नंबर</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-muted rounded-l-md border border-r-0">
                      <span className="text-sm">+91</span>
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email / ईमेल</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password / पासवर्ड</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Registering...
                    </div>
                  ) : (
                    "Register / पंजीकरण करें"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Auto-detected: Hindi / हिंदी</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
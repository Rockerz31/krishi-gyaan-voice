import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  Wheat, 
  TrendingUp, 
  Award,
  Edit3,
  Save,
  Trophy,
  Target
} from "lucide-react";

export function Profile({ language }: { language: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: language === 'hi' ? 'राजेश कुमार' : 'Rajesh Kumar',
    age: 45,
    village: language === 'hi' ? 'रामपुर, पंजाब' : 'Rampur, Punjab',
    phone: '+91 98765 43210',
    landSize: 5.5,
    crops: language === 'hi' ? 'गेहूं, धान, सरसों' : 'Wheat, Rice, Mustard',
    experience: 20
  });

  const achievements = [
    {
      title: language === 'hi' ? 'सर्वश्रेष्ठ किसान 2024' : 'Best Farmer 2024',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      title: language === 'hi' ? 'जैविक खेती चैंपियन' : 'Organic Farming Champion',
      icon: Award,
      color: 'text-crop'
    },
    {
      title: language === 'hi' ? 'उत्पादकता विशेषज्ञ' : 'Productivity Expert',
      icon: TrendingUp,
      color: 'text-primary'
    }
  ];

  const stats = [
    {
      label: language === 'hi' ? 'कुल फसल चक्र' : 'Total Crop Cycles',
      value: '156',
      icon: Wheat,
      color: 'text-crop'
    },
    {
      label: language === 'hi' ? 'औसत उत्पादन' : 'Average Yield',
      value: '4.2 ton/acre',
      icon: TrendingUp,
      color: 'text-primary'
    },
    {
      label: language === 'hi' ? 'सफलता दर' : 'Success Rate',
      value: '92%',
      icon: Target,
      color: 'text-earth'
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {language === 'hi' ? 'किसान प्रोफाइल' : 'Farmer Profile'}
            </CardTitle>
            <Button 
              variant={isEditing ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={isEditing ? 'bg-white text-primary' : 'border-white text-white hover:bg-white hover:text-primary'}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  {language === 'hi' ? 'सेव करें' : 'Save'}
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-1" />
                  {language === 'hi' ? 'संपादित करें' : 'Edit'}
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">
                  {language === 'hi' ? 'नाम' : 'Name'}
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                ) : (
                  <p className="text-lg font-semibold">{profile.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="village">
                  {language === 'hi' ? 'गांव' : 'Village'}
                </Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      id="village"
                      value={profile.village}
                      onChange={(e) => setProfile({...profile, village: e.target.value})}
                    />
                  ) : (
                    <span>{profile.village}</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">
                  {language === 'hi' ? 'फोन नंबर' : 'Phone Number'}
                </Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="age">
                  {language === 'hi' ? 'उम्र' : 'Age'}
                </Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                    />
                  ) : (
                    <span>{profile.age} {language === 'hi' ? 'वर्ष' : 'years'}</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="landSize">
                  {language === 'hi' ? 'भूमि का आकार' : 'Land Size'}
                </Label>
                {isEditing ? (
                  <Input
                    id="landSize"
                    type="number"
                    step="0.1"
                    value={profile.landSize}
                    onChange={(e) => setProfile({...profile, landSize: parseFloat(e.target.value)})}
                  />
                ) : (
                  <p>{profile.landSize} {language === 'hi' ? 'एकड़' : 'acres'}</p>
                )}
              </div>

              <div>
                <Label htmlFor="crops">
                  {language === 'hi' ? 'मुख्य फसलें' : 'Main Crops'}
                </Label>
                {isEditing ? (
                  <Input
                    id="crops"
                    value={profile.crops}
                    onChange={(e) => setProfile({...profile, crops: e.target.value})}
                  />
                ) : (
                  <p>{profile.crops}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">
            {language === 'hi' ? 'उपलब्धियां' : 'Achievements'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-muted p-4 rounded-lg text-center">
                <achievement.icon className={`h-8 w-8 ${achievement.color} mx-auto mb-2`} />
                <h4 className="font-semibold">{achievement.title}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Government Schemes */}
      <Card className="shadow-card border-l-4 border-l-crop">
        <CardHeader>
          <CardTitle className="text-crop">
            {language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-crop/10 p-3 rounded-lg">
              <h4 className="font-semibold text-crop">
                {language === 'hi' ? 'PM किसान सम्मान निधि' : 'PM Kisan Samman Nidhi'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' ? 'स्थिति: सक्रिय - ₹6000/वर्ष' : 'Status: Active - ₹6000/year'}
              </p>
            </div>
            
            <div className="bg-earth/10 p-3 rounded-lg">
              <h4 className="font-semibold text-earth">
                {language === 'hi' ? 'फसल बीमा योजना' : 'Crop Insurance Scheme'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'hi' ? 'कवरेज: 5.5 एकड़' : 'Coverage: 5.5 acres'}
              </p>
            </div>

            <Button variant="hero" className="w-full">
              {language === 'hi' ? 'नई योजनाओं के लिए आवेदन करें' : 'Apply for New Schemes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
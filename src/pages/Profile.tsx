import { useState, useRef } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, User, Mail, Phone, MapPin, Briefcase, Check } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { profile, updateProfile } = useFinance();
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    toast.success("Profile updated successfully!");
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = form.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your personal information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Photo Card */}
        <Card className="glass-card md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              <Avatar className="h-28 w-28 border-4 border-primary/20">
                <AvatarImage src={form.photo} alt={form.name} />
                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="h-6 w-6 text-foreground" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{form.name || "Your Name"}</h3>
              <p className="text-sm text-muted-foreground">{form.jobTitle || "Add your job title"}</p>
              <p className="text-xs text-muted-foreground mt-1">{form.location || "Add location"}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => fileRef.current?.click()}
            >
              <Camera className="h-3.5 w-3.5 mr-1.5" />
              Change Photo
            </Button>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1.5 text-xs">
                  <User className="h-3 w-3" /> Full Name
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1.5 text-xs">
                  <Mail className="h-3 w-3" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1.5 text-xs">
                  <Phone className="h-3 w-3" /> Phone
                </Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="flex items-center gap-1.5 text-xs">
                  <Briefcase className="h-3 w-3" /> Job Title
                </Label>
                <Input
                  id="jobTitle"
                  value={form.jobTitle}
                  onChange={e => setForm(prev => ({ ...prev, jobTitle: e.target.value }))}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="location" className="flex items-center gap-1.5 text-xs">
                  <MapPin className="h-3 w-3" /> Location
                </Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio" className="text-xs">Bio</Label>
                <Textarea
                  id="bio"
                  value={form.bio}
                  onChange={e => setForm(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleSave} className="min-w-[140px]">
                {saved ? (
                  <><Check className="h-4 w-4 mr-1.5" /> Saved!</>
                ) : (
                  <><Save className="h-4 w-4 mr-1.5" /> Save Changes</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

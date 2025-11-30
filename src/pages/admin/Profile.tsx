import React, { useState } from 'react';
import { Card, Button, Input } from "../../components/UI"
import { Camera, Upload } from 'lucide-react';

export const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Developer',
    headline: 'Senior React Engineer | UI/UX Enthusiast',
    location: 'San Francisco, CA',
    avatar: 'https://picsum.photos/300'
  });

  const [preview, setPreview] = useState(profile.avatar);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <Card className="col-span-1 flex flex-col items-center text-center space-y-6">
          <div className="relative group cursor-pointer">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-cyan-500/50 transition-colors">
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <Camera className="text-white" size={32} />
            </div>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} accept="image/*" />
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-1">Profile Photo</h3>
            <p className="text-xs text-gray-500">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
          </div>

          <div className="flex gap-2 w-full">
            <Button variant="secondary" className="flex-1" onClick={() => setPreview('https://picsum.photos/300')}>Reset</Button>
            <Button variant="primary" className="flex-1">Save</Button>
          </div>
        </Card>

        {/* Details Section */}
        <Card className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-4">Personal Details</h3>
          <div className="space-y-6">
            <Input 
              label="Full Name" 
              value={profile.name} 
              onChange={e => setProfile({...profile, name: e.target.value})} 
            />
            <Input 
              label="Headline" 
              value={profile.headline} 
              onChange={e => setProfile({...profile, headline: e.target.value})} 
            />
            <Input 
              label="Location" 
              value={profile.location} 
              onChange={e => setProfile({...profile, location: e.target.value})} 
            />
            
            <div className="pt-4 flex justify-end">
              <Button className="px-8">Save Changes</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
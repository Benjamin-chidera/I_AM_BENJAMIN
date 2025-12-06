import React, { useEffect, useState } from "react";
import { Card, Button, Input } from "../../components/UI";
import { Camera, Upload } from "lucide-react";
import { useProfileStore } from "../../store/profile.store";

export const AdminProfile: React.FC = () => {
  const {
    full_name,
    setFull_name,
    headline,
    setHeadline,
    location,
    setLocation,
    preview,
    setPreview,
    uploadProfile,
    setAvatar,
    getProfile,
    profile,
    updateProfile,
    isUpdating,
  } = useProfileStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      setAvatar(file as any); // Pass File object, not URL
    }
  };

  const handleSaveChanges = async () => {
    if (profile?.id) {
      // Profile exists, update it
      await updateProfile();
    } else {
      // No profile yet, upload new one
      await uploadProfile();
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(profile);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <Card className="col-span-1 flex flex-col items-center text-center space-y-6">
          <div className="relative group cursor-pointer">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-cyan-500/50 transition-colors">
              <img
                src={preview || profile?.profile_image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <Camera className="text-white" size={32} />
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          <div>
            <h3 className="text-white font-medium mb-1">Profile Photo</h3>
            <p className="text-xs text-gray-500">
              Allowed *.jpeg, *.jpg, *.png, *.gif
            </p>
          </div>

          {/* <div className="flex gap-2 w-full">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setPreview("");
                setAvatar("");
              }}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              // onClick={handleSaveChanges}
              // disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </div> */}
        </Card>

        {/* Details Section */}
        <Card className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-4">
            Personal Details
          </h3>
          <div className="space-y-6">
            <Input
              label="Full Name"
              value={full_name || profile?.full_name}
              onChange={(e) => setFull_name(e.target.value)}
            />
            <Input
              label="Headline"
              value={headline || profile?.headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
            <Input
              label="Location"
              value={location || profile?.location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="pt-4 flex justify-end">
              <Button
                className="px-8"
                onClick={handleSaveChanges}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

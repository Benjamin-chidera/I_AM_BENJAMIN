import React, { useEffect, useState } from "react";
import { Card, Button, Input } from "../../components/UI";
import { Camera, Upload, Eye } from "lucide-react";
import { useProfileStore } from "../../store/profile.store";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);

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
    const fetchProfile = async () => {
      setLoading(true);
      await getProfile();
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const currentFullName = full_name || profile?.full_name || "";
  const currentHeadline = headline || profile?.headline || "";
  const currentLocation = location || profile?.location || "";
  const currentImage = preview || profile?.profile_image || "";

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-1 flex flex-col items-center text-center space-y-6">
            <Skeleton circle={true} height={160} width={160} />
            <div className="w-full">
              <Skeleton width={120} height={20} />
              <Skeleton width={180} height={12} className="mt-2" />
            </div>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <Skeleton width={200} height={24} className="mb-6" />
            <div className="space-y-6">
              <div>
                <Skeleton width={100} height={16} className="mb-2" />
                <Skeleton height={40} />
              </div>
              <div>
                <Skeleton width={100} height={16} className="mb-2" />
                <Skeleton height={40} />
              </div>
              <div>
                <Skeleton width={100} height={16} className="mb-2" />
                <Skeleton height={40} />
              </div>
              <div className="pt-4 flex justify-end">
                <Skeleton width={120} height={40} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-right" />

      {/* Preview Toggle Button */}
      <div className="flex justify-end mb-4">
        <Button
          variant="secondary"
          onClick={() => setShowPreview(!showPreview)}
        >
          <Eye size={18} className="mr-2" />
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <Card className="mb-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Eye size={20} className="text-cyan-400" />
            Profile Preview
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white/5 rounded-xl">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500/50">
              <img
                src={currentImage || "/default-avatar.png"}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentFullName || "Your Name"}
              </h2>
              <p className="text-lg text-cyan-400 mb-2">
                {currentHeadline || "Your Headline"}
              </p>
              <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
                <span>📍</span>
                {currentLocation || "Your Location"}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <Card className="col-span-1 flex flex-col items-center text-center space-y-6">
          <div className="relative group cursor-pointer">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-cyan-500/50 transition-colors">
              <img
                src={currentImage || "/default-avatar.png"}
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
        </Card>

        {/* Details Section */}
        <Card className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/5 pb-4">
            Personal Details
          </h3>
          <div className="space-y-6">
            <Input
              label="Full Name"
              value={currentFullName}
              onChange={(e) => setFull_name(e.target.value)}
              disabled={isUpdating}
            />
            <Input
              label="Headline"
              value={currentHeadline}
              onChange={(e) => setHeadline(e.target.value)}
              disabled={isUpdating}
            />
            <Input
              label="Location"
              value={currentLocation}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isUpdating}
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

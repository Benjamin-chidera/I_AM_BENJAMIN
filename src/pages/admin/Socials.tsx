import React, { useEffect, useState } from "react";
import { Card, Button, Input, Modal, Badge } from "../../components/UI";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Trash2,
  Edit2,
  Plus,
  Link as LinkIcon,
} from "lucide-react";
import { Social } from "../../types";
import { useSocialsStore } from "../../store/socials.store";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AdminSocials: React.FC = () => {
  const {
    url,
    platform_name,
    handle,
    setUrl,
    setPlatformName,
    setHandle,
    uploadSocials,
    isModalOpen,
    setIsModalOpen,
    getSocials,
    socials,
    deleteSocials,
    loading,
  } = useSocialsStore();

  const [currentSocial, setCurrentSocial] = useState<Partial<Social>>({});

  const platforms = [
    { value: "GitHub", label: "GitHub", icon: Github },
    { value: "Twitter", label: "Twitter", icon: Twitter },
    { value: "LinkedIn", label: "LinkedIn", icon: Linkedin },
    { value: "Instagram", label: "Instagram", icon: Instagram },
    { value: "whatsapp", label: "whatsapp", icon: LinkIcon },
  ];

  const getIcon = (platform: string) => {
    const p = platforms.find(
      (pl) => pl.value.toLowerCase() === platform.toLowerCase()
    );
    return p ? <p.icon size={20} /> : <LinkIcon size={20} />;
  };

  const handleEdit = (social: Social) => {
    console.log(social);
    setCurrentSocial(social);
    setPlatformName(social.platform_name);
    setHandle(social.handle);
    setUrl(social.url);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this social link?")) {
      deleteSocials(id);
    }
  };

  const handleAddNew = () => {
    setCurrentSocial({});
    setPlatformName("");
    setHandle("");
    setUrl("");
    setIsModalOpen(true);
  };

  useEffect(() => {
    getSocials();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {/* {Array.from({ length: 3 }).map((_, index) => ( */}
        <Card className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton circle={true} height={48} width={48} />
            <div>
              <Skeleton width={100} height={20} className="mb-2" />
              <Skeleton width={80} height={16} />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton width={36} height={36} />
            <Skeleton width={36} height={36} />
          </div>
        </Card>
        {/* ))} */}
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">Social Platforms</h2>
        <Button onClick={handleAddNew} disabled={loading}>
          <Plus size={18} className="mr-2" /> Add Link
        </Button>
      </div>

      {socials && socials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socials.map((social) => (
            <Card
              key={social.id}
              className="flex items-center justify-between group hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                  {getIcon(social.platform_name)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {social.platform_name}
                  </h3>
                  <p className="text-sm text-gray-400">{social.handle}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(social)}
                  disabled={loading}
                >
                  <Edit2 size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(social.id)}
                  disabled={loading}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <LinkIcon size={40} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No Social Links Yet
          </h3>
          <p className="text-gray-400 mb-4">
            Add your social media profiles to showcase your online presence.
          </p>
          <Button onClick={handleAddNew} disabled={loading}>
            <Plus size={18} className="mr-2" /> Add First Link
          </Button>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentSocial({});
          setPlatformName("");
          setHandle("");
          setUrl("");
        }}
        title={currentSocial.id ? "Edit Social" : "Add Social"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Platform
            </label>
            <select
              value={platform_name || ""}
              onChange={(e) => setPlatformName(e.target.value)}
              disabled={loading}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <option value="">Select a platform</option>
              {platforms.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Handle / Display Text"
            placeholder="@username"
            value={handle || ""}
            onChange={(e) => setHandle(e.target.value)}
            disabled={loading}
          />
          <Input
            label="URL"
            placeholder="https://..."
            value={url || ""}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setCurrentSocial({});
                setPlatformName("");
                setHandle("");
                setUrl("");
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={uploadSocials}
              disabled={loading || !platform_name?.trim() || !handle?.trim()}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

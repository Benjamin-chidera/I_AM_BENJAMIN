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
  } = useSocialsStore();

  const [currentSocial, setCurrentSocial] = useState<Partial<Social>>({});

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github size={20} />;
      case "twitter":
        return <Twitter size={20} />;
      case "linkedin":
        return <Linkedin size={20} />;
      case "instagram":
        return <Instagram size={20} />;
      default:
        return <LinkIcon size={20} />;
    }
  };

  const handleEdit = (social: Social) => {
    console.log(social);

    setCurrentSocial(social);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this social link?")) {
      deleteSocials(id);
    }
  };

  useEffect(() => {
    getSocials();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">Social Platforms</h2>
        <Button
          onClick={() => {
            setCurrentSocial({});
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} className="mr-2" /> Add Link
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socials?.map((social) => (
          <Card
            key={social.id}
            className="flex items-center justify-between group"
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
              >
                <Edit2 size={14} />
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDelete(social.id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentSocial.id ? "Edit Social" : "Add Social"}
      >
        <div className="space-y-4">
          <Input
            label="Platform Name"
            placeholder="e.g. GitHub"
            value={platform_name || currentSocial?.platform_name}
            onChange={(e) => setPlatformName(e.target.value)}
          />
          <Input
            label="Handle / Display Text"
            placeholder="@username"
            value={handle || currentSocial?.handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          <Input
            label="URL"
            placeholder="https://..."
            value={url || currentSocial?.url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={uploadSocials}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

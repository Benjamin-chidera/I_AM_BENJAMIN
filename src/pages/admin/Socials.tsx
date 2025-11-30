import React, { useState } from 'react';
import { Card, Button, Input, Modal, Badge } from "../../components/UI"
import { Github, Twitter, Linkedin, Instagram, Trash2, Edit2, Plus, Link as LinkIcon } from 'lucide-react';
import { Social } from '../../types';

export const AdminSocials: React.FC = () => {
  const [socials, setSocials] = useState<Social[]>([
    { id: '1', platform: 'GitHub', url: 'https://github.com/alexdev', handle: '@alexdev' },
    { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/alexdev', handle: 'Alex Developer' },
    { id: '3', platform: 'Twitter', url: 'https://x.com/alexcode', handle: '@alexcode' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSocial, setCurrentSocial] = useState<Partial<Social>>({});

  const getIcon = (platform: string) => {
    switch(platform.toLowerCase()) {
      case 'github': return <Github size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'instagram': return <Instagram size={20} />;
      default: return <LinkIcon size={20} />;
    }
  };

  const handleEdit = (social: Social) => {
    setCurrentSocial(social);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if(confirm('Delete this social link?')) {
      setSocials(socials.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (currentSocial.id) {
      setSocials(socials.map(s => s.id === currentSocial.id ? currentSocial as Social : s));
    } else {
      setSocials([...socials, { ...currentSocial, id: Date.now().toString() } as Social]);
    }
    setIsModalOpen(false);
    setCurrentSocial({});
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">Social Platforms</h2>
        <Button onClick={() => { setCurrentSocial({}); setIsModalOpen(true); }}>
          <Plus size={18} className="mr-2" /> Add Link
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socials.map((social) => (
          <Card key={social.id} className="flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                {getIcon(social.platform)}
              </div>
              <div>
                <h3 className="font-semibold text-white">{social.platform}</h3>
                <p className="text-sm text-gray-400">{social.handle}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" onClick={() => handleEdit(social)}><Edit2 size={14} /></Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(social.id)}><Trash2 size={14} /></Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentSocial.id ? "Edit Social" : "Add Social"}>
        <div className="space-y-4">
          <Input 
            label="Platform Name" 
            placeholder="e.g. GitHub"
            value={currentSocial.platform || ''}
            onChange={e => setCurrentSocial({...currentSocial, platform: e.target.value})}
          />
          <Input 
            label="Handle / Display Text" 
            placeholder="@username"
            value={currentSocial.handle || ''}
            onChange={e => setCurrentSocial({...currentSocial, handle: e.target.value})}
          />
          <Input 
            label="URL" 
            placeholder="https://..."
            value={currentSocial.url || ''}
            onChange={e => setCurrentSocial({...currentSocial, url: e.target.value})}
          />
          <div className="flex justify-end gap-3 mt-6">
             <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
             <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
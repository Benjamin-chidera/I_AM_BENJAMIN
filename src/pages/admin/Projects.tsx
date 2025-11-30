import React, { useState } from 'react';
import { Card, Button, Input, Modal, Badge, Textarea } from "../../components/UI"
import { Project } from '../../types';
import { Plus, Github, Globe, Edit, Trash, Folder } from 'lucide-react';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Neon Dashboard',
      description: 'A React-based crypto dashboard with real-time data visualization.',
      tags: ['React', 'Tailwind', 'Recharts'],
      githubUrl: '#',
      liveUrl: '#',
      status: 'Completed'
    },
    {
      id: '2',
      title: 'AI Image Gen',
      description: 'Wrapper around Gemini API to generate images from prompts.',
      tags: ['AI', 'API', 'Python'],
      githubUrl: '#',
      liveUrl: '#',
      status: 'In Development'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

  const handleSave = () => {
    if (currentProject.id) {
      setProjects(projects.map(p => p.id === currentProject.id ? currentProject as Project : p));
    } else {
      setProjects([...projects, { ...currentProject, id: Date.now().toString(), tags: currentProject.tags || [] } as Project]);
    }
    setIsModalOpen(false);
    setCurrentProject({});
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'green';
      case 'In Development': return 'yellow';
      default: return 'cyan';
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">My Projects</h2>
        <Button onClick={() => { setCurrentProject({status: 'In Development', tags: []}); setIsModalOpen(true); }}>
          <Plus size={18} className="mr-2" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col h-full group hover:bg-white/[0.03] transition-colors relative">
             <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setCurrentProject(project); setIsModalOpen(true); }} className="p-2 bg-black/50 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all">
                  <Edit size={16} />
                </button>
                <button onClick={() => setProjects(projects.filter(p => p.id !== project.id))} className="p-2 bg-black/50 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all">
                  <Trash size={16} />
                </button>
             </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                 <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                    <Folder size={24} />
                 </div>
                 <Badge color={getStatusColor(project.status) as any}>{project.status}</Badge>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-3 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300 border border-white/5">{tag}</span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex gap-3 pt-4 border-t border-white/5">
               <a href={project.githubUrl} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors">
                 <Github size={16} /> Code
               </a>
               <a href={project.liveUrl} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-sm text-cyan-400 transition-colors">
                 <Globe size={16} /> Live
               </a>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentProject.id ? "Edit Project" : "New Project"}>
        <div className="space-y-4">
          <Input 
             label="Project Title" 
             value={currentProject.title || ''} 
             onChange={e => setCurrentProject({...currentProject, title: e.target.value})} 
          />
          <Textarea 
             label="Description" 
             rows={3}
             value={currentProject.description || ''} 
             onChange={e => setCurrentProject({...currentProject, description: e.target.value})} 
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="GitHub URL" 
              value={currentProject.githubUrl || ''} 
              onChange={e => setCurrentProject({...currentProject, githubUrl: e.target.value})} 
            />
            <Input 
              label="Live URL" 
              value={currentProject.liveUrl || ''} 
              onChange={e => setCurrentProject({...currentProject, liveUrl: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Status</label>
            <select 
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 focus:outline-none focus:border-cyan-500/50"
              value={currentProject.status || 'In Development'}
              onChange={e => setCurrentProject({...currentProject, status: e.target.value as any})}
            >
              <option value="In Development">In Development</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <Input 
             label="Tags (comma separated)" 
             value={currentProject.tags?.join(', ') || ''} 
             onChange={e => setCurrentProject({...currentProject, tags: e.target.value.split(',').map(s => s.trim())})} 
             placeholder="React, Node.js, Design"
          />
          <div className="flex justify-end gap-3 mt-6">
             <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
             <Button onClick={handleSave}>Save Project</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
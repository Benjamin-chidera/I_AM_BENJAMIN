import React, { useState } from 'react';
import { Card, Button, Input, Modal, Textarea } from "../../components/UI"
import { Experience } from '../../types';
import { Plus, Briefcase, Calendar, Trash2, Edit2 } from 'lucide-react';

export const AdminExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      role: 'Senior Frontend Engineer',
      company: 'Tech Corp',
      year: '2021 - Present',
      description: 'Leading the frontend team in rebuilding the legacy dashboard using React and TypeScript.',
      projects: ['Analytics Dashboard', 'Design System']
    },
    {
      id: '2',
      role: 'Web Developer',
      company: 'StartUp Inc',
      year: '2019 - 2021',
      description: 'Developed responsive marketing websites and e-commerce platforms.',
      projects: ['Corporate Site', 'Shopify Theme']
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState<Partial<Experience>>({});

  const handleSave = () => {
    if (currentExp.id) {
       setExperiences(experiences.map(e => e.id === currentExp.id ? currentExp as Experience : e));
    } else {
       setExperiences([...experiences, { ...currentExp, id: Date.now().toString(), projects: currentExp.projects || [] } as Experience]);
    }
    setIsModalOpen(false);
    setCurrentExp({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold text-white">Work History</h2>
        <Button onClick={() => { setCurrentExp({projects: []}); setIsModalOpen(true); }}>
          <Plus size={18} className="mr-2" /> Add Experience
        </Button>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-transparent md:before:ml-[2.5rem]">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative flex items-start group">
            <div className="absolute left-0 h-10 w-10 md:h-20 md:w-20 flex items-center justify-center rounded-full bg-[#0c0c1d] border-2 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)] z-10">
              <Briefcase className="h-5 w-5 md:h-8 md:w-8 text-cyan-400" />
            </div>
            
            <div className="ml-16 md:ml-32 w-full">
               <Card className="hover:border-cyan-500/30 transition-all">
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                     <h4 className="text-lg text-cyan-400 font-medium">{exp.company}</h4>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                     <span className="flex items-center text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">
                       <Calendar size={12} className="mr-2" /> {exp.year}
                     </span>
                     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setCurrentExp(exp); setIsModalOpen(true); }} className="p-1.5 hover:bg-white/10 rounded text-cyan-400"><Edit2 size={14} /></button>
                        <button onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))} className="p-1.5 hover:bg-white/10 rounded text-red-400"><Trash2 size={14} /></button>
                     </div>
                   </div>
                 </div>
                 
                 <p className="text-gray-400 mb-4 leading-relaxed">{exp.description}</p>
                 
                 <div>
                   <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Key Projects</span>
                   <div className="flex flex-wrap gap-2 mt-2">
                     {exp.projects.map((proj, idx) => (
                       <span key={idx} className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                         {proj}
                       </span>
                     ))}
                   </div>
                 </div>
               </Card>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentExp.id ? "Edit Experience" : "Add Experience"}>
        <div className="space-y-4">
          <Input label="Job Role" value={currentExp.role || ''} onChange={e => setCurrentExp({...currentExp, role: e.target.value})} />
          <Input label="Company" value={currentExp.company || ''} onChange={e => setCurrentExp({...currentExp, company: e.target.value})} />
          <Input label="Years (e.g., 2020 - 2022)" value={currentExp.year || ''} onChange={e => setCurrentExp({...currentExp, year: e.target.value})} />
          <Textarea label="Description" rows={3} value={currentExp.description || ''} onChange={e => setCurrentExp({...currentExp, description: e.target.value})} />
          <Input 
             label="Projects (comma separated)" 
             value={currentExp.projects?.join(', ') || ''} 
             onChange={e => setCurrentExp({...currentExp, projects: e.target.value.split(',').map(s => s.trim())})} 
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
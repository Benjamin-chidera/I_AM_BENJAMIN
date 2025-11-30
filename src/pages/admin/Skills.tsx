import React, { useState } from 'react';
import { Card, Button, Input, Modal } from "../../components/UI"
import { Skill } from '../../types';
import { Plus, X, Cpu, Layout, Server, Database, Wrench } from 'lucide-react';

export const AdminSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Frontend' | 'Backend' | 'AI/ML' | 'Tools'>('Frontend');
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'React', category: 'Frontend' },
    { id: '2', name: 'TailwindCSS', category: 'Frontend' },
    { id: '3', name: 'Node.js', category: 'Backend' },
    { id: '4', name: 'Python', category: 'AI/ML' },
    { id: '5', name: 'Docker', category: 'Tools' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');

  const categories = ['Frontend', 'Backend', 'AI/ML', 'Tools'];

  const handleAddSkill = () => {
    if(!newSkillName) return;
    setSkills([...skills, { id: Date.now().toString(), name: newSkillName, category: activeTab }]);
    setNewSkillName('');
    setIsModalOpen(false);
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  }

  const getIcon = (cat: string) => {
     switch(cat) {
        case 'Frontend': return <Layout size={18} />;
        case 'Backend': return <Server size={18} />;
        case 'AI/ML': return <Cpu size={18} />;
        case 'Tools': return <Wrench size={18} />;
        default: return <Database size={18} />;
     }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-white">Skills Matrix</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your technical expertise.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl">
           {categories.map(cat => (
             <button 
               key={cat}
               onClick={() => setActiveTab(cat as any)}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                 activeTab === cat 
                 ? 'bg-cyan-500/20 text-cyan-400 shadow-lg' 
                 : 'text-gray-400 hover:text-white'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
         {/* Add Button Card */}
         <button 
           onClick={() => setIsModalOpen(true)}
           className="flex flex-col items-center justify-center p-6 border border-dashed border-white/20 rounded-2xl bg-white/[0.02] hover:bg-white/5 hover:border-cyan-500/50 hover:text-cyan-400 transition-all text-gray-400 group h-32"
         >
            <Plus size={32} className="mb-2 group-hover:scale-110 transition-transform"/>
            <span className="text-sm font-medium">Add {activeTab} Skill</span>
         </button>

         {skills.filter(s => s.category === activeTab).map(skill => (
           <Card key={skill.id} className="relative group flex flex-col items-center justify-center h-32 hover:bg-white/10 transition-colors border-white/5">
              <button 
                 onClick={() => deleteSkill(skill.id)}
                 className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all"
              >
                 <X size={14} />
              </button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center text-cyan-400 mb-3 border border-white/10 shadow-inner">
                 {getIcon(skill.category)}
              </div>
              <span className="font-medium text-gray-200 text-center">{skill.name}</span>
           </Card>
         ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add ${activeTab} Skill`}>
        <div className="space-y-4">
           <Input 
              label="Skill Name" 
              placeholder="e.g. GraphQL" 
              value={newSkillName}
              onChange={e => setNewSkillName(e.target.value)}
              autoFocus
           />
           <div className="flex justify-end gap-3 mt-6">
             <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
             <Button onClick={handleAddSkill}>Add Skill</Button>
           </div>
        </div>
      </Modal>
    </div>
  );
};
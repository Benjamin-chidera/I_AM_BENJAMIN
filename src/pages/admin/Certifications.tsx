import React, { useState } from 'react';
import { Card, Button, Input, Modal } from "../../components/UI"
import { Certificate } from '../../types';
import { Plus, Award, Trash2, ExternalLink, Calendar } from 'lucide-react';

export const AdminCertifications: React.FC = () => {
  const [certs, setCerts] = useState<Certificate[]>([
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023',
      url: '#'
    },
    {
      id: '2',
      name: 'Meta Front-End Developer',
      issuer: 'Coursera',
      year: '2022',
      url: '#'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCert, setNewCert] = useState<Partial<Certificate>>({});

  const handleSave = () => {
    if (!newCert.name) return;
    setCerts([...certs, { ...newCert, id: Date.now().toString() } as Certificate]);
    setIsModalOpen(false);
    setNewCert({});
  };

  const deleteCert = (id: string) => {
    if(confirm("Remove this certification?")) {
      setCerts(certs.filter(c => c.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Certifications & Licenses</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} className="mr-2" /> Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {certs.length === 0 && (
          <div className="p-8 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
            No certifications added yet.
          </div>
        )}
        
        {certs.map((cert) => (
          <Card key={cert.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 hover:bg-white/[0.02] transition-colors group">
             <div className="flex items-center gap-4 w-full sm:w-auto">
               <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 shrink-0">
                  <Award size={24} />
               </div>
               <div>
                  <h3 className="text-lg font-medium text-white">{cert.name}</h3>
                  <div className="flex items-center text-sm text-gray-400 gap-3">
                    <span>{cert.issuer}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span className="flex items-center"><Calendar size={12} className="mr-1"/> {cert.year}</span>
                  </div>
               </div>
             </div>
             
             <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
               {cert.url && (
                 <a 
                   href={cert.url} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                   title="View Certificate"
                 >
                   <ExternalLink size={18} />
                 </a>
               )}
               <button 
                 onClick={() => deleteCert(cert.id)} 
                 className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                 title="Delete"
               >
                 <Trash2 size={18} />
               </button>
             </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Certification">
        <div className="space-y-4">
           <Input 
              label="Certificate Name" 
              value={newCert.name || ''} 
              onChange={e => setNewCert({...newCert, name: e.target.value})} 
              placeholder="e.g. AWS Certified..."
           />
           <Input 
              label="Issuer Organization" 
              value={newCert.issuer || ''} 
              onChange={e => setNewCert({...newCert, issuer: e.target.value})} 
              placeholder="e.g. Google, Coursera"
           />
           <div className="grid grid-cols-2 gap-4">
              <Input 
                  label="Year Issued" 
                  value={newCert.year || ''} 
                  onChange={e => setNewCert({...newCert, year: e.target.value})} 
                  placeholder="2023"
              />
              <Input 
                  label="Credential URL (Optional)" 
                  value={newCert.url || ''} 
                  onChange={e => setNewCert({...newCert, url: e.target.value})} 
                  placeholder="https://..."
              />
           </div>
           <div className="flex justify-end gap-3 mt-6">
             <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
             <Button onClick={handleSave}>Add Certificate</Button>
           </div>
        </div>
      </Modal>
    </div>
  );
};
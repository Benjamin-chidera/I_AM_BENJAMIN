import React, { useState } from 'react';
import { Card, Button, Textarea } from "../../components/UI"
import { Save, Eye, Edit3 } from 'lucide-react';

export const AdminAbout: React.FC = () => {
  const [content, setContent] = useState(
    `# About Me\n\nI am a passionate software engineer with 5+ years of experience in building modern web applications. \n\n## Tech Stack\n- React\n- TypeScript\n- Node.js\n\nI love solving complex problems and designing intuitive user interfaces.`
  );
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">About Section</h2>
          <p className="text-sm text-gray-500">Write your bio using Markdown.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? <><Edit3 size={16} className="mr-2"/> Edit</> : <><Eye size={16} className="mr-2"/> Preview</>}
          </Button>
          <Button>
            <Save size={16} className="mr-2" /> Save Content
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden p-0 bg-[#0f0f1a]">
        {isPreview ? (
          <div className="flex-1 p-8 overflow-y-auto prose prose-invert prose-cyan max-w-none">
             {/* A simplistic markdown rendering simulation for preview */}
             {content.split('\n').map((line, i) => {
               if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mb-4 text-white">{line.replace('# ', '')}</h1>
               if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mb-3 mt-6 text-cyan-400">{line.replace('## ', '')}</h2>
               if (line.startsWith('- ')) return <li key={i} className="ml-4 text-gray-300">{line.replace('- ', '')}</li>
               if (line === '') return <br key={i} />
               return <p key={i} className="mb-2 text-gray-300 leading-relaxed">{line}</p>
             })}
          </div>
        ) : (
          <textarea
            className="flex-1 w-full h-full bg-transparent p-6 text-gray-200 resize-none focus:outline-none font-mono text-sm leading-relaxed"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
          />
        )}
      </Card>
    </div>
  );
};
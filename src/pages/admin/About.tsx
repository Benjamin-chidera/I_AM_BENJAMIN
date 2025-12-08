import React, { useEffect, useState } from "react";
import { Card, Button } from "../../components/UI";
import { Save, Eye, Edit3 } from "lucide-react";
import { useAboutStore } from "../../store/about.store";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const AdminAbout: React.FC = () => {
  const {
    about_me,
    setAbout_me,
    getAbout,
    uploadAbout,
    updateAbout,
    isStored,
    isUpdating,
  } = useAboutStore();

  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSaveContent = async () => {
    if (isStored) {
      await updateAbout();
    } else {
      await uploadAbout();
    }
  };

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      await getAbout();
      setLoading(false);
    };
    fetchAbout();
  }, []);

  // React Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "color",
    "background",
    "link",
  ];

  if (loading) {
    return (
      <div className="h-[calc(100vh-140px)] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Skeleton width={200} height={24} />
            <Skeleton width={250} height={16} className="mt-2" />
          </div>
          <div className="flex space-x-3">
            <Skeleton width={100} height={40} />
            <Skeleton width={120} height={40} />
          </div>
        </div>
        <Card className="flex-1 flex flex-col overflow-hidden p-8">
          <Skeleton height={40} className="mb-4" />
          <Skeleton height={40} className="mb-4" />
          <Skeleton height={40} className="mb-4" />
          <Skeleton height={100} />
        </Card>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">About Section</h2>
          <p className="text-sm text-gray-500">
            Write your bio using the rich text editor.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? (
              <>
                <Edit3 size={16} className="mr-2" /> Edit
              </>
            ) : (
              <>
                <Eye size={16} className="mr-2" /> Preview
              </>
            )}
          </Button>
          <Button onClick={handleSaveContent} disabled={isUpdating}>
            <Save size={16} className="mr-2" />
            {isUpdating ? "Saving..." : "Save Content"}
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden p-0 bg-[#0f0f1a]">
        {isPreview ? (
          <div
            className="flex-1 p-8 overflow-y-auto prose prose-invert prose-cyan max-w-none"
            dangerouslySetInnerHTML={{ __html: about_me || "" }}
          />
        ) : (
          <div className="flex-1 overflow-hidden">
            <ReactQuill
              theme="snow"
              value={about_me || ""}
              onChange={setAbout_me}
              modules={modules}
              formats={formats}
              className="h-full"
              style={{ height: "100%" }}
            />
          </div>
        )}
      </Card>

      <style>{`
        .ql-toolbar {
          background: #1a1a2e;
          border: 1px solid #2d2d44 !important;
          border-radius: 8px 8px 0 0;
        }
        
        .ql-container {
          background: #0f0f1a;
          border: 1px solid #2d2d44 !important;
          border-top: none !important;
          border-radius: 0 0 8px 8px;
          font-size: 16px;
          height: calc(100% - 42px) !important;
        }
        
        .ql-editor {
          color: #e5e5e5;
          min-height: 400px;
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
        }
        
        .ql-editor.ql-blank::before {
          color: #6b7280;
          font-style: normal;
        }
        
        .ql-toolbar button {
          color: #9ca3af !important;
        }
        
        .ql-toolbar button:hover {
          color: #22d3ee !important;
        }
        
        .ql-toolbar button.ql-active {
          color: #22d3ee !important;
        }
        
        .ql-stroke {
          stroke: #9ca3af !important;
        }
        
        .ql-toolbar button:hover .ql-stroke {
          stroke: #22d3ee !important;
        }
        
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #22d3ee !important;
        }
        
        .ql-fill {
          fill: #9ca3af !important;
        }
        
        .ql-toolbar button:hover .ql-fill {
          fill: #22d3ee !important;
        }
        
        .ql-toolbar button.ql-active .ql-fill {
          fill: #22d3ee !important;
        }
        
        .ql-picker-label {
          color: #9ca3af !important;
        }
        
        .ql-picker-label:hover {
          color: #22d3ee !important;
        }
        
        .ql-picker-options {
          background: #1a1a2e !important;
          border: 1px solid #2d2d44 !important;
        }
        
        .ql-picker-item {
          color: #e5e5e5 !important;
        }
        
        .ql-picker-item:hover {
          color: #22d3ee !important;
        }
        
        /* Preview styles */
        .prose h1 {
          color: #ffffff;
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .prose h2 {
          color: #22d3ee;
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .prose h3 {
          color: #22d3ee;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose p {
          color: #d1d5db;
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        
        .prose strong {
          color: #ffffff;
          font-weight: 600;
        }
        
        .prose em {
          color: #d1d5db;
        }
        
        .prose ul, .prose ol {
          color: #d1d5db;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose blockquote {
          border-left: 4px solid #22d3ee;
          padding-left: 1rem;
          color: #9ca3af;
          font-style: italic;
          margin: 1.5rem 0;
        }
        
        .prose code {
          background: #1a1a2e;
          color: #22d3ee;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }
        
        .prose pre {
          background: #1a1a2e;
          color: #e5e5e5;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .prose a {
          color: #22d3ee;
          text-decoration: none;
        }
        
        .prose a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

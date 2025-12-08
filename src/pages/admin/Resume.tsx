import React, { useEffect, useState } from "react";
import { Card, Button, Input, Modal } from "../../components/UI";
import { FileText, ExternalLink, Trash2, Edit2, Upload } from "lucide-react";
import { useResumeStore } from "../../store/resume.store";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AdminResume: React.FC = () => {
  const [status, setStatus] = useState("isEditing");
  const {
    uploadResume,
    url,
    setUrl,
    isModalOpen,
    setIsModalOpen,
    getResume,
    updateResume,
    deleteResume,
    isStored,
    isUpdating,
  } = useResumeStore();

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to remove the resume?")) {
      deleteResume();
    }
  };

  useEffect(() => {
    getResume();
  }, []);

  // Show skeleton whenever loading/updating
  if (isUpdating) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-lg text-gray-400">Manage Resume</h2>
            <p className="text-sm text-gray-500">
              Update your CV link visible to recruiters.
            </p>
          </div>
        </div>
        <Card className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6 w-full">
            <Skeleton circle width={64} height={64} />
            <div className="flex-1 space-y-2">
              <Skeleton width={160} height={18} />
              <Skeleton width={"70%"} height={14} />
              <Skeleton width={120} height={10} />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Skeleton width={80} height={40} />
            <Skeleton width={100} height={40} />
            <Skeleton width={60} height={40} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-lg text-gray-400">Manage Resume</h2>
          <p className="text-sm text-gray-500">
            Update your CV link visible to recruiters.
          </p>
        </div>
        {!url && (
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setStatus("isUploading");
            }}
          >
            + Add Resume
          </Button>
        )}
      </div>

      {isStored ? (
        <Card className="flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Current Resume
              </h3>
              <a
                href={url || ""}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 mt-1"
              >
                {url} <ExternalLink size={12} />
              </a>
              <p className="text-xs text-gray-500 mt-2">
                Uploaded: Oct 24, 2023
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="secondary"
              onClick={() => window.open(url || "", "_blank")}
            >
              View
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              <Edit2 size={16} className="mr-2" /> Update
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <Trash2 size={16} />
            </Button>
          </div>
        </Card>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 flex flex-col items-center justify-center">
          <div className="bg-white/5 p-4 rounded-full mb-4">
            <Upload size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-white">No Resume Uploaded</h3>
          <p className="text-gray-500 mb-6">
            Upload a PDF or provide a link to your resume.
          </p>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setStatus("isUploading");
            }}
          >
            Upload Resume
          </Button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Resume URL"
      >
        <div className="space-y-4">
          <Input
            label="Resume Link (PDF/Google Drive)"
            value={url || ""}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                status === "isEditing" ? updateResume() : uploadResume();
              }}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

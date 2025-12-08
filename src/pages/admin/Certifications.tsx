import React, { useEffect, useState } from "react";
import { Card, Button, Input, Modal } from "../../components/UI";
import { Plus, Award, Trash2, ExternalLink, Calendar } from "lucide-react";
import { useCertificationsStore } from "../../store/certifications.store";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AdminCertifications: React.FC = () => {
  const {
    certifications,
    getCertifications,
    createCertification,
    updateCertification,
    deleteCertification,
    isUpdating,
    cert_name,
    setCertName,
    issued_organization,
    setIssuedOrganization,
    year_issued,
    setYearIssued,
    cert_url,
    setCertUrl,
    currentCertId,
    setCurrentCertId,
    isModalOpen,
    setIsModalOpen,
    clearForm,
  } = useCertificationsStore();

  const [loading, setLoading] = useState(true);

  const handleSave = async () => {
    if (!cert_name) return;

    if (currentCertId) {
      await updateCertification();
    } else {
      await createCertification();
    }
    setIsModalOpen(false);
  };

  const handleDeleteCert = (id: string) => {
    if (confirm("Remove this certification?")) {
      deleteCertification(id);
    }
  };

  const openEditModal = (cert: any) => {
    setCurrentCertId(cert.id);
    setCertName(cert.cert_name);
    setIssuedOrganization(cert.issued_organization);
    setYearIssued(cert.year_issued);
    setCertUrl(cert.cert_url);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    clearForm();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchCertifications = async () => {
      setLoading(true);
      await getCertifications();
      setLoading(false);
    };
    fetchCertifications();
  }, [getCertifications]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton width={250} height={28} />
          <Skeleton width={170} height={40} />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* {Array.from({ length: certifications.length }).map((_, index) => ( */}
            <Card
              // key={index}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Skeleton circle={true} height={48} width={48} />
                <div className="flex-1">
                  <Skeleton width={200} height={20} className="mb-2" />
                  <Skeleton width={250} height={16} />
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Skeleton width={36} height={36} circle={true} />
                <Skeleton width={36} height={36} circle={true} />
              </div>
            </Card>
          {/* ))} */}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          Certifications & Licenses
        </h2>
        <Button onClick={openCreateModal} disabled={isUpdating}>
          <Plus size={18} className="mr-2" /> Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {certifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
            <Award size={40} className="mx-auto mb-3 opacity-50" />
            <p>No certifications added yet.</p>
            <button
              onClick={openCreateModal}
              className="text-cyan-500 hover:underline text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUpdating}
            >
              Add your first certificate +
            </button>
          </div>
        ) : (
          certifications.map((cert) => (
            <Card
              key={cert.id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 hover:bg-white/[0.02] transition-colors group cursor-pointer"
              onClick={() => openEditModal(cert)}
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {cert.cert_name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-400 gap-3">
                    <span>{cert.issued_organization}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" /> {cert.year_issued}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center gap-3 w-full sm:w-auto justify-end"
                onClick={(e) => e.stopPropagation()}
              >
                {cert.cert_url && (
                  <a
                    href={cert.cert_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="View Certificate"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCert(cert.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete"
                  disabled={isUpdating}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          clearForm();
        }}
        title={currentCertId ? "Edit Certification" : "Add Certification"}
      >
        <div className="space-y-4">
          <Input
            label="Certificate Name"
            value={cert_name || ""}
            onChange={(e) => setCertName(e.target.value)}
            placeholder="e.g. AWS Certified..."
            disabled={isUpdating}
          />
          <Input
            label="Issuer Organization"
            value={issued_organization || ""}
            onChange={(e) => setIssuedOrganization(e.target.value)}
            placeholder="e.g. Google, Coursera"
            disabled={isUpdating}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Year Issued"
              value={year_issued || ""}
              onChange={(e) => setYearIssued(e.target.value)}
              placeholder="2023"
              disabled={isUpdating}
            />
            <Input
              label="Credential URL (Optional)"
              value={cert_url || ""}
              onChange={(e) => setCertUrl(e.target.value)}
              placeholder="https://..."
              disabled={isUpdating}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                clearForm();
              }}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isUpdating || !cert_name?.trim()}
            >
              {isUpdating
                ? "Saving..."
                : currentCertId
                ? "Update Certificate"
                : "Add Certificate"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

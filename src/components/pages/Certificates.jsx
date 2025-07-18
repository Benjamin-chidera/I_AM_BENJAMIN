"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function Certificates() {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: "React Developer Certification",
      issuedBy: "Meta",
      url: "https://coursera.org/certificate/123",
    },
  ]);

  const [certificateForm, setCertificateForm] = useState({
    title: "",
    issuedBy: "",
    url: "",
  });

  const [editingCertificate, setEditingCertificate] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  const handleAddCertificate = () => {
    const newCertificate = {
      id: Date.now(),
      ...certificateForm,
    };
    setCertificates([...certificates, newCertificate]);
    setCertificateForm({ title: "", issuedBy: "", url: "" });
  };

  const handleEditCertificate = (cert) => {
    setEditingCertificate(cert);
    setCertificateForm(cert);
  };

  const handleUpdateCertificate = () => {
    setCertificates(
      certificates.map((c) =>
        c.id === editingCertificate.id
          ? { ...certificateForm, id: editingCertificate.id }
          : c
      )
    );
    setEditingCertificate(null);
    setCertificateForm({ title: "", issuedBy: "", url: "" });
  };

  const handleDeleteCertificate = (id) => {
    setCertificates(certificates.filter((c) => c.id !== id));
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" color="white" className="mb-2">
          Certificates
        </Typography>
        <Typography color="gray" className="text-gray-400">
          Manage your certifications
        </Typography>
      </div>

      <Card className="bg-gray-800">
        <CardHeader>
          <Typography variant="h5" color="white">
            Add Certificate
          </Typography>
          <Typography color="gray" className="text-gray-400">
            Add your certifications and achievements
          </Typography>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <Typography color="white" className="mb-2">
              Certificate Title
            </Typography>
            <Input
              value={certificateForm.title}
              onChange={(e) =>
                setCertificateForm({
                  ...certificateForm,
                  title: e.target.value,
                })
              }
              className="!border-gray-600 !bg-gray-700 text-white"
              labelProps={{ className: "text-white" }}
            />
          </div>
          <div>
            <Typography color="white" className="mb-2">
              Issued By
            </Typography>
            <Input
              value={certificateForm.issuedBy}
              onChange={(e) =>
                setCertificateForm({
                  ...certificateForm,
                  issuedBy: e.target.value,
                })
              }
              className="!border-gray-600 !bg-gray-700 text-white"
              labelProps={{ className: "text-white" }}
            />
          </div>
          <div>
            <Typography color="white" className="mb-2">
              Certificate URL
            </Typography>
            <Input
              value={certificateForm.url}
              onChange={(e) =>
                setCertificateForm({ ...certificateForm, url: e.target.value })
              }
              className="!border-gray-600 !bg-gray-700 text-white"
              labelProps={{ className: "text-white" }}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={
                editingCertificate
                  ? handleUpdateCertificate
                  : handleAddCertificate
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              {editingCertificate ? "Update Certificate" : "Add Certificate"}
            </Button>
            {editingCertificate && (
              <Button
                variant="outlined"
                onClick={() => {
                  setEditingCertificate(null);
                  setCertificateForm({ title: "", issuedBy: "", url: "" });
                }}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {certificates.map((cert) => (
          <Card key={cert.id} className="bg-gray-800">
            <CardHeader>
              <Typography variant="h5" color="white">
                {cert.title}
              </Typography>
              <Typography color="gray">Issued by {cert.issuedBy}</Typography>
            </CardHeader>
            <CardBody>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outlined"
                  className="border-gray-600 text-gray-300"
                >
                  <EyeIcon className="w-4 h-4 mr-1" />
                  View
                </Button>
                <IconButton
                  size="sm"
                  onClick={() => handleEditCertificate(cert)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <PencilIcon className="w-4 h-4" />
                </IconButton>
                <IconButton
                  size="sm"
                  color="red"
                  onClick={() => setDeleteDialog({ open: true, id: cert.id })}
                >
                  <TrashIcon className="w-4 h-4" />
                </IconButton>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        handler={() => setDeleteDialog({ open: false, id: null })}
      >
        <DialogHeader className="bg-gray-800 text-white">
          <Typography variant="h5" color="white">
            Delete Certificate
          </Typography>
        </DialogHeader>
        <DialogBody className="bg-gray-800 text-gray-300">
          Are you sure you want to delete this certificate?
        </DialogBody>
        <DialogFooter className="bg-gray-800">
          <Button
            variant="outlined"
            onClick={() => setDeleteDialog({ open: false, id: null })}
            className="mr-2 border-gray-600 text-gray-300"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => handleDeleteCertificate(deleteDialog.id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles

export default function AboutMe() {
  const [aboutMe, setAboutMe] = useState("Write about yourself here...");

  const handleSave = () => {
    // Here you would typically save to a database or API
    console.log("Saving about me:", aboutMe);
    // You could show a success message here
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <Typography variant="h2" color="white" className="mb-2">
          About Me
        </Typography>
        <Typography color="gray" className="text-gray-400">
          Write about yourself
        </Typography>
      </div>

      {/* About Me Card */}
      <Card className="bg-gray-800">
        <CardHeader>
          <Typography variant="h5" color="white">
            About Me Content
          </Typography>
          <Typography color="gray" className="text-gray-400">
            Write about yourself using rich text
          </Typography>
        </CardHeader>
        <CardBody className="">
          {/* Rich Text Editor */}
          <ReactQuill
            value={aboutMe}
            onChange={setAboutMe}
            className="bg-gray-700 text-white rounded-lg h-[400px]"
            theme="snow"
            placeholder="Tell your story..."
          />
          <Button
            onClick={handleSave}
            className="mt-14 bg-blue-600 hover:bg-blue-700"
          >
            Save About Me
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

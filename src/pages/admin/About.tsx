import React, { useEffect } from "react";
import { Card, Button, Textarea } from "../../components/UI";
import { Save, Eye, Edit3 } from "lucide-react";
import { useAboutStore } from "../../store/about.store";

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

  const [isPreview, setIsPreview] = React.useState(false);

  const handleSaveContent = async () => {
    if (isStored) {
      // Profile exists, update it
      await updateAbout();
    } else {
      // No profile yet, upload new one
      await uploadAbout();
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">About Section</h2>
          <p className="text-sm text-gray-500">
            Write your bio using Markdown.
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
          <div className="flex-1 p-8 overflow-y-auto prose prose-invert prose-cyan max-w-none">
            {(about_me || "").split("\n").map((line, i) => {
              if (line.startsWith("# "))
                return (
                  <h1 key={i} className="text-3xl font-bold mb-4 text-white">
                    {line.replace("# ", "")}
                  </h1>
                );
              if (line.startsWith("## "))
                return (
                  <h2
                    key={i}
                    className="text-2xl font-bold mb-3 mt-6 text-cyan-400"
                  >
                    {line.replace("## ", "")}
                  </h2>
                );
              if (line.startsWith("- "))
                return (
                  <li key={i} className="ml-4 text-gray-300">
                    {line.replace("- ", "")}
                  </li>
                );
              if (line === "") return <br key={i} />;
              return (
                <p key={i} className="mb-2 text-gray-300 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        ) : (
          <textarea
            className="flex-1 w-full h-full bg-transparent p-6 text-gray-200 resize-none focus:outline-none font-mono text-sm leading-relaxed"
            value={about_me || ""}
            onChange={(e) => setAbout_me(e.target.value)}
            spellCheck={false}
            placeholder="Write your bio using Markdown..."
          />
        )}
      </Card>
    </div>
  );
};

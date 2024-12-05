import React from 'react';
import { Upload, X } from 'lucide-react';

interface MaterialUploadProps {
  materials: File[];
  setMaterials: (materials: File[]) => void;
}

export default function MaterialUpload({ materials, setMaterials }: MaterialUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMaterials([...materials, ...Array.from(e.target.files)]);
    }
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Teaching Materials
      </h3>
      
      <div className="space-y-4">
        <label className="block">
          <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <div className="flex flex-col items-center space-y-2">
              <Upload className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Drop files or click to upload
              </span>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />
          </div>
        </label>

        {materials.length > 0 && (
          <div className="space-y-2">
            {materials.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {file.name}
                </span>
                <button
                  onClick={() => removeMaterial(index)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
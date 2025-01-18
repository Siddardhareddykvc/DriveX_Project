import React, { useCallback } from 'react';
import { Upload, FileWarning } from 'lucide-react';
import type { DocumentData } from '../types';

interface FileUploadProps {
  onFileUpload: (data: DocumentData) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith('.xlsx')) {
        const reader = new FileReader();
        reader.onload = async () => {
          onFileUpload({
            content: reader.result as ArrayBuffer,
            name: file.name,
            type: file.type,
            size: file.size,
          });
        };
        reader.readAsArrayBuffer(file);
      }
    },
    [onFileUpload]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = async () => {
        onFileUpload({
          content: reader.result as ArrayBuffer,
          name: file.name,
          type: file.type,
          size: file.size,
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div
      className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            Drag and drop your Excel file here
          </p>
          <p className="text-sm text-gray-500">or click to browse</p>
        </div>
        <input
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleFileInput}
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Select File
        </label>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FileWarning className="w-4 h-4" />
          <span>Only .xlsx files are supported</span>
        </div>
      </div>
    </div>
  );
};
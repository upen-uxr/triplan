import React, { useState } from 'react';
import { Upload, File } from 'lucide-react';

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle files
    const files = Array.from(e.dataTransfer.files);
    console.log('Dropped files:', files);
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Documents</h2>
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="mb-4">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop your files here, or
          </p>
          <label className="btn btn-primary cursor-pointer inline-block">
            Browse Files
            <input
              type="file"
              className="hidden"
              multiple
              onChange={(e) => console.log('Selected files:', e.target.files)}
            />
          </label>
        </div>
        <p className="text-sm text-gray-500">
          Supported formats: PDF, JPG, PNG
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Uploads
        </h3>
        <div className="space-y-2">
          {['Flight Ticket.pdf', 'Hotel Booking.pdf'].map((file) => (
            <div
              key={file}
              className="flex items-center p-3 bg-white rounded-lg shadow-sm"
            >
              <File className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-gray-700">{file}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
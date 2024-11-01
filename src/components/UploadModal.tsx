import React from 'react';
import { X, Upload, Camera } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Add Documents</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="w-5 h-5" />
            <span>Upload Files</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
            <Camera className="w-5 h-5" />
            <span>Scan Document</span>
          </button>
          
          <p className="text-sm text-gray-500 text-center">
            Supported formats: PDF, JPG, PNG
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
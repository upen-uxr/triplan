import React, { useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

const ScanPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Scan Documents</h2>

      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        {previewUrl ? (
          <div className="space-y-4">
            <img
              src={previewUrl}
              alt="Scanned document"
              className="max-w-full rounded-lg"
            />
            <button
              onClick={() => setPreviewUrl(null)}
              className="btn btn-secondary"
            >
              Retake
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Position your document within the frame
              </p>
              <label className="btn btn-primary cursor-pointer inline-block">
                Take Photo
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleCapture}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Scans
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {['scan1.jpg', 'scan2.jpg'].map((scan) => (
            <div
              key={scan}
              className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
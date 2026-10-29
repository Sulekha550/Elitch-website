import React, { useState, useRef } from 'react';
import { UploadCloud, X, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function ImageUploader({
  value,
  onChange,
  label = 'Project Asset / Image',
  multiple = false,
  helperText = 'Recommended: High resolution JPG, PNG, or WebP up to 10MB.'
}) {
  const { showToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlField, setShowUrlField] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      if (multiple) {
        const fileList = Array.from(files);
        const res = await api.uploadMultiple(fileList);
        if (res.success && res.files) {
          const newUrls = res.files.map((f) => ({ url: f.url, caption: '', displayOrder: 0 }));
          const existing = Array.isArray(value) ? value : [];
          onChange([...existing, ...newUrls]);
          showToast({ type: 'success', title: 'Upload Complete', message: `Uploaded ${res.files.length} images successfully.` });
        }
      } else {
        const file = files[0];
        const res = await api.uploadFile(file);
        if (res.success && res.url) {
          onChange(res.url);
          showToast({ type: 'success', title: 'Upload Complete', message: 'Image uploaded successfully.' });
        }
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Upload Failed',
        message: err.message || 'Failed to upload image to server.'
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    if (multiple) {
      const existing = Array.isArray(value) ? value : [];
      onChange([...existing, { url: urlInput.trim(), caption: '', displayOrder: existing.length + 1 }]);
    } else {
      onChange(urlInput.trim());
    }
    setUrlInput('');
    setShowUrlField(false);
    showToast({ type: 'success', title: 'Asset Linked', message: 'Image URL successfully attached.' });
  };

  const handleRemoveSingle = () => {
    onChange('');
  };

  const handleRemoveMultiple = (index) => {
    if (Array.isArray(value)) {
      const updated = value.filter((_, i) => i !== index);
      onChange(updated);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold tracking-wide uppercase text-[#241B35]">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlField(!showUrlField)}
          className="text-xs text-[#6D28D9] hover:text-[#4C1D95] font-medium flex items-center space-x-1"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>{showUrlField ? 'Close Direct URL' : 'Paste Image URL'}</span>
        </button>
      </div>

      {showUrlField && (
        <div className="flex items-center space-x-2 p-2 rounded-xl bg-[#FAF8FC] border border-[#EDE5F5] animate-fade-in shadow-xs">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-1 bg-white text-xs text-[#241B35] placeholder-[#9B91A8] border border-[#EDE5F5] rounded-lg focus:outline-none focus:border-[#6D28D9] px-3 py-1.5"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-colors shadow-xs"
          >
            Apply
          </button>
        </div>
      )}

      {/* Single Image Mode */}
      {!multiple && (
        <div>
          {value ? (
            <div className="relative group rounded-2xl overflow-hidden border border-[#EDE5F5] bg-white aspect-video sm:aspect-[21/9] max-h-64 shadow-xs">
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-[#241B35]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 backdrop-blur-xs">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white text-[#241B35] border border-[#EDE5F5] hover:border-[#6D28D9] transition-colors shadow-md"
                >
                  Replace File
                </button>
                <button
                  type="button"
                  onClick={handleRemoveSingle}
                  className="p-2 rounded-xl bg-[#E11D48] text-white hover:bg-[#BE123C] transition-colors shadow-md"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileUpload(e.dataTransfer.files);
              }}
              className="border-2 border-dashed border-[#EDE5F5] hover:border-[#6D28D9] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all bg-[#FAF8FC] hover:bg-[#F3EEFF]/40 group"
            >
              {isUploading ? (
                <div className="flex flex-col items-center space-y-2">
                  <Loader2 className="w-8 h-8 text-[#6D28D9] animate-spin" />
                  <span className="text-xs text-[#786D88]">Uploading asset to server...</span>
                </div>
              ) : (
                <>
                  <div className="p-3.5 rounded-2xl bg-[#F3E8FF] text-[#6D28D9] mb-3 border border-[#DDD6FE] group-hover:scale-105 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-[#241B35] mb-1">
                    Click or drag image to upload
                  </span>
                  <span className="text-xs text-[#9B91A8]">{helperText}</span>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Multiple Images Mode */}
      {multiple && (
        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileUpload(e.dataTransfer.files);
            }}
            className="border-2 border-dashed border-[#EDE5F5] hover:border-[#6D28D9] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-[#FAF8FC] hover:bg-[#F3EEFF]/40 group"
          >
            {isUploading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 text-[#6D28D9] animate-spin" />
                <span className="text-xs text-[#786D88]">Processing upload batch...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-[#F3E8FF] text-[#6D28D9] border border-[#DDD6FE]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="text-xs text-[#241B35] font-medium">
                  Upload multiple gallery photos (or drop them here)
                </span>
              </div>
            )}
          </div>

          {Array.isArray(value) && value.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {value.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border border-[#EDE5F5] bg-white aspect-video shadow-xs"
                >
                  <img
                    src={typeof item === 'string' ? item : item.url}
                    alt={item.caption || `Gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMultiple(idx)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#241B35]/80 text-white hover:bg-[#E11D48] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFileUpload(e.target.files)}
        className="hidden"
      />
    </div>
  );
}


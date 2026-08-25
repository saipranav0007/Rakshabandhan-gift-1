import React, { useState } from 'react';
import { X, Upload, Link, Check, RefreshCw, AlertCircle, Camera } from 'lucide-react';
import type { PhotoMemory } from '../../types/memory';
import { compressImage, savePhoto, resetPhoto } from '../../services/photoStorage';

interface PhotoCustomizerModalProps {
  photo: PhotoMemory | null;
  isOpen: boolean;
  onClose: () => void;
  onPhotoUpdated: (updated: PhotoMemory) => void;
}

export const PhotoCustomizerModal: React.FC<PhotoCustomizerModalProps> = ({
  photo,
  isOpen,
  onClose,
  onPhotoUpdated,
}) => {
  if (!isOpen || !photo) return null;

  const [title, setTitle] = useState<string>(photo.title);
  const [description, setDescription] = useState<string>(photo.description);
  const [dateLabel, setDateLabel] = useState<string>(photo.dateLabel || '');
  const [previewUrl, setPreviewUrl] = useState<string>(photo.imageUrl);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WEBP, etc.)');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);
    try {
      const compressedDataUrl = await compressImage(file);
      setSelectedFile(file);
      setPreviewUrl(compressedDataUrl);
      setCustomUrlInput('');
    } catch (err) {
      console.error('Error compressing image:', err);
      setErrorMessage('Could not process this image. Try another photo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyUrl = () => {
    if (!customUrlInput.trim()) return;
    setPreviewUrl(customUrlInput.trim());
    setSelectedFile(null);
  };

  const handleSave = async () => {
    setIsProcessing(true);
    setErrorMessage('');
    try {
      let finalImageUrl = previewUrl;

      if (selectedFile) {
        finalImageUrl = await compressImage(selectedFile);
      } else if (customUrlInput.trim()) {
        finalImageUrl = customUrlInput.trim();
      }

      const updated: PhotoMemory = {
        ...photo,
        title: title.trim() || photo.title,
        description: description.trim() || photo.description,
        dateLabel: dateLabel.trim() || photo.dateLabel,
        imageUrl: finalImageUrl,
        customUploaded: true,
      };

      await savePhoto(updated);
      onPhotoUpdated(updated);

      setSuccessMessage('Photo saved and persisted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Failed to save photo:', err);
      setErrorMessage('Failed to save photo. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset this photo memory back to default?')) return;
    setIsProcessing(true);
    try {
      const reset = await resetPhoto(photo.id);
      setTitle(reset.title);
      setDescription(reset.description);
      setDateLabel(reset.dateLabel || '');
      setPreviewUrl(reset.imageUrl);
      setSelectedFile(null);
      setCustomUrlInput('');
      onPhotoUpdated(reset);
      setSuccessMessage('Reset to default memory card.');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 800);
    } catch (err) {
      setErrorMessage('Could not reset photo.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-lg w-full bg-obsidian-900 border border-festive-amber/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 my-6 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-festive-gold/15 text-festive-amber border border-festive-gold/30">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-festive-cream">
                Customize Photo #{photo.slotNumber}
              </h3>
              <p className="text-xs text-slate-400">
                Upload our real photo (Saved persistently in your browser)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Card */}
        <div className="flex flex-col items-center">
          <div className="relative p-2.5 bg-amber-50 rounded-lg shadow-md max-w-[190px] w-full transform -rotate-1 border border-amber-200">
            <div className="w-full aspect-[4/5] bg-black/90 rounded overflow-hidden flex items-center justify-center border border-amber-200/60">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-handwritten text-center text-slate-900 font-bold text-sm mt-1.5 truncate">
              {title || 'Photo Memory'}
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3.5 text-xs">
          {/* File Upload Button (Mobile Camera & PC File Picker) */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5 flex items-center justify-between">
              <span>Choose Photo (Phone Camera or Gallery)</span>
              <span className="text-[11px] text-festive-amber">Auto-compressed</span>
            </label>
            <label className="flex items-center justify-center gap-2.5 w-full py-2.5 px-4 rounded-xl bg-festive-amber/10 border border-dashed border-festive-amber/50 hover:bg-festive-amber/20 cursor-pointer text-festive-amber font-semibold transition-all">
              <Upload className="w-4 h-4" />
              <span>{selectedFile ? `Selected: ${selectedFile.name.slice(0, 20)}...` : 'Choose photo from phone / computer'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Optional Direct URL */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Or Paste Image URL (Optional)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-obsidian-950 border border-slate-700 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-festive-amber"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Memory Title */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Memory Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Childhood, Uncle Chips days"
              className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-festive-amber"
            />
          </div>

          {/* Caption / Description */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Short Description / Caption
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Tell what you remember about this moment..."
              className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-festive-amber resize-none"
            />
          </div>

          {/* Date / Phase Tag */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Memory Tag / Phase (Optional)
            </label>
            <input
              type="text"
              value={dateLabel}
              onChange={(e) => setDateLabel(e.target.value)}
              placeholder="e.g., 1st Class Memories, Growing Up"
              className="w-full px-3 py-2 rounded-xl bg-obsidian-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-festive-amber"
            />
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-900/30 border border-red-800 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-900/30 border border-emerald-800 text-emerald-300 text-xs">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleReset}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Photo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-festive-gold to-festive-amber text-slate-950 hover:brightness-110 shadow-lg shadow-festive-amber/20 disabled:opacity-50"
            >
              {isProcessing ? (
                'Saving...'
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Apply Photo</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

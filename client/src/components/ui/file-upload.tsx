import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload, X, FileImage, Video, Music } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
}

export default function FileUpload({ onFilesSelected, selectedFiles }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
        'video/mp4', 'video/mpeg', 'video/quicktime',
        'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg'
      ];
      return allowedTypes.includes(file.type) && file.size <= 50 * 1024 * 1024; // 50MB
    });

    onFilesSelected([...selectedFiles, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onFilesSelected(newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileImage size={24} />;
    if (file.type.startsWith('video/')) return <Video size={24} />;
    if (file.type.startsWith('audio/')) return <Music size={24} />;
    return <FileImage size={24} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver 
            ? 'border-heritage-brown bg-heritage-cornsilk' 
            : 'border-heritage-burlywood bg-heritage-cornsilk/30 hover:bg-heritage-cornsilk/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudUpload className="text-4xl text-heritage-peru mb-4 mx-auto" size={48} />
        <h4 className="text-heritage-brown font-semibold mb-2">Upload Media Files</h4>
        <p className="text-heritage-brown/70 mb-4">Drag and drop photos, videos, or audio files here</p>
        <p className="text-sm text-heritage-brown/60 mb-4">Supported formats: JPG, PNG, MP4, MP3, WAV (Max 50MB per file)</p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-heritage-peru hover:bg-heritage-brown text-white px-6 py-2 font-medium"
        >
          Choose Files
        </Button>
      </div>

      {/* File Previews */}
      {selectedFiles.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-heritage-beige rounded-lg overflow-hidden border-2 border-heritage-burlywood flex flex-col items-center justify-center p-4">
                <div className="text-heritage-brown mb-2">
                  {getFileIcon(file)}
                </div>
                <div className="text-center">
                  <p className="text-xs text-heritage-brown font-medium truncate w-full">
                    {file.name}
                  </p>
                  <p className="text-xs text-heritage-brown/60">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X size={12} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

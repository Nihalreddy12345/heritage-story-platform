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
    <div className="space-y-6">
      <div>
        <label className="text-gray-dark font-semibold text-sm mb-2 block">
          Media Files (Optional)
        </label>
        <div 
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
            dragOver 
              ? 'border-lavender-primary bg-lavender-light scale-[1.02]' 
              : 'border-light-gray bg-sky-blue-light/30 hover:bg-sky-blue-light/50 hover:border-sky-blue'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CloudUpload className="text-lavender-primary mb-4 mx-auto animate-pulse-subtle" size={48} />
          <h4 className="text-gray-dark font-semibold mb-2">Upload Media Files</h4>
          <p className="text-gray-medium mb-3">Drag and drop photos, videos, or audio files here</p>
          <p className="text-sm text-gray-medium mb-6">Supported formats: JPG, PNG, MP4, MP3, WAV (Max 50MB per file)</p>
          
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
            className="bg-sky-blue hover:bg-lavender-primary text-white px-8 py-3 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Choose Files
          </Button>
        </div>
      </div>

      {/* File Previews */}
      {selectedFiles.length > 0 && (
        <div className="animate-fade-in">
          <h5 className="text-gray-dark font-semibold mb-4">Selected Files ({selectedFiles.length})</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="aspect-square bg-lavender-light rounded-2xl overflow-hidden border-2 border-light-gray flex flex-col items-center justify-center p-4 hover-lift group-hover:shadow-lg transition-all duration-200">
                  <div className="text-lavender-primary mb-2">
                    {getFileIcon(file)}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-dark font-medium truncate w-full">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-medium">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-md"
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

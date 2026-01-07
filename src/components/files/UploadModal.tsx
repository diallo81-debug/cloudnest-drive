import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

function formatFileSize(bytes: number): string {
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function UploadModal({ isOpen, onClose, onUploadComplete }: UploadModalProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'pending' as const,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const simulateUpload = async () => {
    setIsUploading(true);

    for (const uploadFile of files) {
      if (uploadFile.status !== 'pending') continue;

      // Set to uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: 'uploading' as const } : f
        )
      );

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, progress } : f
          )
        );
      }

      // Set to complete
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: 'complete' as const } : f
        )
      );
    }

    setIsUploading(false);
    onUploadComplete();
  };

  const pendingCount = files.filter((f) => f.status === 'pending').length;
  const completedCount = files.filter((f) => f.status === 'complete').length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Files
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-secondary/30'
            )}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={{ scale: isDragActive ? 1.05 : 1 }}
              className="space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse
                </p>
              </div>
            </motion.div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <AnimatePresence>
                {files.map((uploadFile) => (
                  <motion.div
                    key={uploadFile.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                  >
                    <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {uploadFile.file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(uploadFile.file.size)}
                        </span>
                        {uploadFile.status === 'uploading' && (
                          <Progress value={uploadFile.progress} className="h-1 flex-1" />
                        )}
                      </div>
                    </div>
                    {uploadFile.status === 'pending' && (
                      <button
                        onClick={() => removeFile(uploadFile.id)}
                        className="p-1 hover:bg-background rounded"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                    {uploadFile.status === 'uploading' && (
                      <Loader2 className="h-4 w-4 text-primary animate-spin" />
                    )}
                    {uploadFile.status === 'complete' && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                    {uploadFile.status === 'error' && (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">
              {completedCount > 0 && `${completedCount} uploaded`}
              {completedCount > 0 && pendingCount > 0 && ' • '}
              {pendingCount > 0 && `${pendingCount} pending`}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={simulateUpload}
                disabled={pendingCount === 0 || isUploading}
                className="gradient-primary"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {pendingCount > 0 && `(${pendingCount})`}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

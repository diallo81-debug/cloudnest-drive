import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { FileGrid } from '@/components/files/FileGrid';
import { UploadModal } from '@/components/files/UploadModal';
import { NewFolderModal } from '@/components/files/NewFolderModal';
import { ShareModal } from '@/components/files/ShareModal';
import { useFileStore, FileItem } from '@/stores/fileStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export default function Dashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [shareFile, setShareFile] = useState<FileItem | null>(null);
  
  const { 
    files, 
    currentFolder, 
    selectFile, 
    deselectFile, 
    selectedFiles,
    addFile,
    removeFile,
    setCurrentFolder 
  } = useFileStore();
  
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const currentFiles = files.filter((f) => f.parentId === currentFolder);

  const handleFileSelect = (id: string) => {
    if (selectedFiles.includes(id)) {
      deselectFile(id);
    } else {
      selectFile(id);
    }
  };

  const handleFileOpen = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentFolder(file.id);
    } else {
      // Open file preview
      toast({
        title: 'Opening file',
        description: `Opening ${file.name}...`,
      });
    }
  };

  const handleFileDelete = (id: string) => {
    removeFile(id);
    toast({
      title: 'File deleted',
      description: 'The file has been moved to trash.',
    });
  };

  const handleFileShare = (file: FileItem) => {
    setShareFile(file);
  };

  const handleFileRename = (file: FileItem) => {
    toast({
      title: 'Rename',
      description: `Renaming ${file.name}...`,
    });
  };

  const handleNewFolder = (name: string) => {
    const newFolder: FileItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      type: 'folder',
      parentId: currentFolder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addFile(newFolder);
    toast({
      title: 'Folder created',
      description: `"${name}" has been created.`,
    });
  };

  const handleUploadComplete = () => {
    toast({
      title: 'Upload complete',
      description: 'Your files have been uploaded successfully.',
    });
    setIsUploadOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onUploadClick={() => setIsUploadOpen(true)} />
        
        <main className="flex-1 overflow-auto p-6">
          <FileGrid
            files={currentFiles}
            onFileSelect={handleFileSelect}
            onFileOpen={handleFileOpen}
            onFileDelete={handleFileDelete}
            onFileShare={handleFileShare}
            onFileRename={handleFileRename}
            onNewFolder={() => setIsNewFolderOpen(true)}
          />
        </main>
      </div>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <NewFolderModal
        isOpen={isNewFolderOpen}
        onClose={() => setIsNewFolderOpen(false)}
        onCreate={handleNewFolder}
      />

      <ShareModal
        isOpen={!!shareFile}
        onClose={() => setShareFile(null)}
        file={shareFile}
      />
    </div>
  );
}

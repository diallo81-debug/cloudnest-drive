import { AnimatePresence } from 'framer-motion';
import { FileCard } from './FileCard';
import { FileItem, useFileStore } from '@/stores/fileStore';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileGridProps {
  files: FileItem[];
  onFileSelect: (id: string) => void;
  onFileOpen: (file: FileItem) => void;
  onFileDelete: (id: string) => void;
  onFileShare: (file: FileItem) => void;
  onFileRename: (file: FileItem) => void;
  onNewFolder: () => void;
}

export function FileGrid({
  files,
  onFileSelect,
  onFileOpen,
  onFileDelete,
  onFileShare,
  onFileRename,
  onNewFolder,
}: FileGridProps) {
  const { viewMode, setViewMode, selectedFiles, searchQuery } = useFileStore();

  // Filter files based on search query
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort: folders first, then by name
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex-1 flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">My Files</h2>
          <span className="text-sm text-muted-foreground">
            {filteredFiles.length} items
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onNewFolder}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          
          <div className="flex items-center bg-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Files */}
      {sortedFiles.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
              <LayoutGrid className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {searchQuery ? 'No files match your search' : 'No files yet'}
            </p>
            {!searchQuery && (
              <Button onClick={onNewFolder} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Folder
              </Button>
            )}
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {sortedFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                isSelected={selectedFiles.includes(file.id)}
                viewMode="grid"
                onSelect={() => onFileSelect(file.id)}
                onOpen={() => onFileOpen(file)}
                onDelete={() => onFileDelete(file.id)}
                onShare={() => onFileShare(file)}
                onRename={() => onFileRename(file)}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-1">
          {/* List Header */}
          <div className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
            <div className="w-10" />
            <div className="flex-1">Name</div>
            <div className="w-20 text-right">Size</div>
            <div className="w-28">Modified</div>
            <div className="w-8" />
          </div>
          
          <AnimatePresence mode="popLayout">
            {sortedFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                isSelected={selectedFiles.includes(file.id)}
                viewMode="list"
                onSelect={() => onFileSelect(file.id)}
                onOpen={() => onFileOpen(file)}
                onDelete={() => onFileDelete(file.id)}
                onShare={() => onFileShare(file)}
                onRename={() => onFileRename(file)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

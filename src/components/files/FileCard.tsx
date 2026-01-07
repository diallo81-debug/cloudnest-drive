import { motion } from 'framer-motion';
import { 
  Folder, 
  FileText, 
  Image, 
  Film, 
  Music, 
  FileSpreadsheet,
  File,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Edit3,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileItem } from '@/stores/fileStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FileCardProps {
  file: FileItem;
  isSelected: boolean;
  viewMode: 'grid' | 'list';
  onSelect: () => void;
  onOpen: () => void;
  onDelete: () => void;
  onShare: () => void;
  onRename: () => void;
}

function getFileIcon(file: FileItem) {
  if (file.type === 'folder') return Folder;
  
  const mimeType = file.mimeType || '';
  if (mimeType.startsWith('image/')) return Image;
  if (mimeType.startsWith('video/')) return Film;
  if (mimeType.startsWith('audio/')) return Music;
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return FileSpreadsheet;
  if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return FileText;
  
  return File;
}

function getFileIconColor(file: FileItem) {
  if (file.type === 'folder') return 'text-primary';
  
  const mimeType = file.mimeType || '';
  if (mimeType.startsWith('image/')) return 'text-pink-500';
  if (mimeType.startsWith('video/')) return 'text-purple-500';
  if (mimeType.startsWith('audio/')) return 'text-orange-500';
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'text-green-500';
  if (mimeType.includes('pdf')) return 'text-red-500';
  if (mimeType.includes('document') || mimeType.includes('text')) return 'text-blue-500';
  
  return 'text-muted-foreground';
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return '';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function FileCard({
  file,
  isSelected,
  viewMode,
  onSelect,
  onOpen,
  onDelete,
  onShare,
  onRename,
}: FileCardProps) {
  const Icon = getFileIcon(file);
  const iconColor = getFileIconColor(file);

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        whileHover={{ backgroundColor: 'hsl(var(--secondary))' }}
        onClick={onSelect}
        onDoubleClick={onOpen}
        className={cn(
          'flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-colors border',
          isSelected ? 'bg-primary/10 border-primary/30' : 'border-transparent hover:border-border'
        )}
      >
        <div className={cn('p-2 rounded-lg bg-secondary', iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{file.name}</p>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <span className="w-20 text-right">{formatFileSize(file.size)}</span>
          <span className="w-28">{formatDate(file.updatedAt)}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="p-1.5 rounded-lg hover:bg-background transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRename}>
              <Edit3 className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Star className="h-4 w-4 mr-2" />
              Add to Starred
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
      onClick={onSelect}
      onDoubleClick={onOpen}
      className={cn(
        'group relative bg-card rounded-xl p-4 cursor-pointer transition-all border',
        isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/30'
      )}
    >
      {/* Menu Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRename}>
            <Edit3 className="h-4 w-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Star className="h-4 w-4 mr-2" />
            Add to Starred
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="h-4 w-4 mr-2" />
            Download
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* File Preview / Icon */}
      <div className="aspect-square rounded-lg bg-secondary/50 flex items-center justify-center mb-3 overflow-hidden">
        {file.type === 'file' && file.mimeType?.startsWith('image/') && file.url ? (
          <img 
            src={file.url} 
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Icon className={cn('h-12 w-12', iconColor)} />
        )}
      </div>

      {/* File Info */}
      <div className="space-y-1">
        <p className="font-medium text-sm truncate" title={file.name}>
          {file.name}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatFileSize(file.size)}</span>
          <span>{formatDate(file.updatedAt)}</span>
        </div>
      </div>
    </motion.div>
  );
}

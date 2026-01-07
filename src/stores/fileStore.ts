import { create } from 'zustand';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  mimeType?: string;
  url?: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  sharedWith?: string[];
  isStarred?: boolean;
}

interface FileState {
  files: FileItem[];
  currentFolder: string | null;
  selectedFiles: string[];
  viewMode: 'grid' | 'list';
  searchQuery: string;
  isLoading: boolean;
  storageUsed: number;
  storageLimit: number;
  
  setFiles: (files: FileItem[]) => void;
  addFile: (file: FileItem) => void;
  removeFile: (id: string) => void;
  updateFile: (id: string, updates: Partial<FileItem>) => void;
  setCurrentFolder: (folderId: string | null) => void;
  selectFile: (id: string) => void;
  deselectFile: (id: string) => void;
  clearSelection: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
}

// Mock initial files
const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    parentId: null,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Images',
    type: 'folder',
    parentId: null,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Projects',
    type: 'folder',
    parentId: null,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: '4',
    name: 'presentation.pdf',
    type: 'file',
    size: 2500000,
    mimeType: 'application/pdf',
    parentId: null,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '5',
    name: 'report.docx',
    type: 'file',
    size: 150000,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    parentId: null,
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-12'),
  },
  {
    id: '6',
    name: 'budget.xlsx',
    type: 'file',
    size: 85000,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    parentId: null,
    createdAt: new Date('2024-02-14'),
    updatedAt: new Date('2024-02-14'),
  },
  {
    id: '7',
    name: 'vacation-photo.jpg',
    type: 'file',
    size: 3200000,
    mimeType: 'image/jpeg',
    parentId: null,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  },
  {
    id: '8',
    name: 'notes.txt',
    type: 'file',
    size: 5000,
    mimeType: 'text/plain',
    parentId: null,
    createdAt: new Date('2024-02-16'),
    updatedAt: new Date('2024-02-16'),
  },
];

export const useFileStore = create<FileState>((set) => ({
  files: mockFiles,
  currentFolder: null,
  selectedFiles: [],
  viewMode: 'grid',
  searchQuery: '',
  isLoading: false,
  storageUsed: 5.8 * 1024 * 1024 * 1024, // 5.8 GB
  storageLimit: 15 * 1024 * 1024 * 1024, // 15 GB

  setFiles: (files) => set({ files }),
  
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  
  removeFile: (id) => set((state) => ({
    files: state.files.filter((f) => f.id !== id),
    selectedFiles: state.selectedFiles.filter((fId) => fId !== id),
  })),
  
  updateFile: (id, updates) => set((state) => ({
    files: state.files.map((f) => (f.id === id ? { ...f, ...updates } : f)),
  })),
  
  setCurrentFolder: (folderId) => set({ currentFolder: folderId, selectedFiles: [] }),
  
  selectFile: (id) => set((state) => ({
    selectedFiles: state.selectedFiles.includes(id)
      ? state.selectedFiles
      : [...state.selectedFiles, id],
  })),
  
  deselectFile: (id) => set((state) => ({
    selectedFiles: state.selectedFiles.filter((fId) => fId !== id),
  })),
  
  clearSelection: () => set({ selectedFiles: [] }),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setLoading: (loading) => set({ isLoading: loading }),
}));
